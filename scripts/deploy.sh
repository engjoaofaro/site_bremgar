#!/usr/bin/env bash
# ==============================================================================
# Script de Deploy Local para AWS S3 + Invalidação do CloudFront
# Uso: S3_BUCKET="meu-bucket" CLOUDFRONT_DISTRIBUTION_ID="E1XXX..." ./scripts/deploy.sh
# ==============================================================================
set -euo pipefail

S3_BUCKET="${S3_BUCKET:-site-bremgar-prod}"
CLOUDFRONT_DISTRIBUTION_ID="${CLOUDFRONT_DISTRIBUTION_ID:-}"

echo "========================================================================"
echo "🚀 Iniciando deploy local do site para a AWS..."
echo "📦 Bucket S3: s3://${S3_BUCKET}"
if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
  echo "🌐 CloudFront ID: ${CLOUDFRONT_DISTRIBUTION_ID}"
fi
echo "========================================================================"

# 1) Assets estáticos: cache de longo prazo e remoção de arquivos deletados
echo "1️⃣  Sincronizando assets estáticos (com cache de longo prazo)..."
aws s3 sync . "s3://${S3_BUCKET}/" \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html" \
  --exclude ".git/*" \
  --exclude ".github/*" \
  --exclude ".idea/*" \
  --exclude ".remember/*" \
  --exclude ".DS_Store" \
  --exclude "README.md" \
  --exclude "LICENSE" \
  --exclude "scripts/*"

# 2) HTML: revalidação constante (no-cache)
echo "2️⃣  Sincronizando arquivos HTML (revalidação imediata)..."
aws s3 sync . "s3://${S3_BUCKET}/" \
  --cache-control "public, max-age=0, must-revalidate" \
  --exclude "*" \
  --include "*.html" \
  --content-type "text/html; charset=utf-8"

# 3) Invalidação de cache no CloudFront
if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
  echo "3️⃣  Invalidando cache no CloudFront (${CLOUDFRONT_DISTRIBUTION_ID})..."
  INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
    --paths '/*' \
    --query 'Invalidation.Id' \
    --output text)
  echo "✅ Invalidação disparada com sucesso! (ID: ${INVALIDATION_ID})"
else
  echo "ℹ️  CLOUDFRONT_DISTRIBUTION_ID não foi informado. Pulando invalidação de cache."
fi

echo "========================================================================"
echo "🎉 Deploy finalizado com sucesso!"
echo "========================================================================"
