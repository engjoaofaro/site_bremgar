#!/usr/bin/env bash
# ==============================================================================
# Script de Criação Inicial de Infraestrutura AWS (S3 + CloudFront)
# Baseado nos padrões de infraestrutura do ecossistema Bremgar
# ==============================================================================
set -euo pipefail

DOMAIN="${1:-bremgar.com.br}"
BUCKET_NAME="${2:-site-bremgar-prod}"
REGION="sa-east-1"

echo "========================================================================"
echo "🏗️  Configurando infraestrutura AWS para o site: ${DOMAIN}"
echo "📦 Bucket S3: ${BUCKET_NAME}"
echo "📍 Região: ${REGION}"
echo "========================================================================"

# 1. Criar bucket S3
echo "1️⃣  Criando bucket S3 (${BUCKET_NAME})..."
if [ "$REGION" = "us-east-1" ]; then
  aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION" || true
else
  aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION" \
    --create-bucket-configuration LocationConstraint="$REGION" || true
fi

# 2. Remover bloqueio público de acesso ao S3 para habilitar Static Website Hosting
echo "2️⃣  Liberando acesso público de leitura para o site estático..."
aws s3api delete-public-access-block --bucket "$BUCKET_NAME" || true

# 3. Aplicar política de bucket para leitura pública
cat <<EOF > /tmp/bucket-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${BUCKET_NAME}/*"
    }
  ]
}
EOF
aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy file:///tmp/bucket-policy.json

# 4. Configurar Website Hosting
echo "3️⃣  Habilitando Static Website Hosting no bucket S3..."
aws s3api put-bucket-website --bucket "$BUCKET_NAME" --website-configuration '{
  "IndexDocument": { "Suffix": "index.html" },
  "ErrorDocument": { "Key": "index.html" }
}'

BUCKET_ENDPOINT="${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com"
echo "✅ Website S3 configurado na URL: http://${BUCKET_ENDPOINT}"

# 5. Gerar configuração do CloudFront
echo "4️⃣  Para criar a distribuição CloudFront via CLI ou Console:"
echo "   -> Origem (Custom Origin): http://${BUCKET_ENDPOINT}"
echo "   -> Viewer Protocol Policy: Redirect HTTP to HTTPS"
echo "   -> Compressão Gzip/Brotli: Enabled"
echo ""
echo "💡 Dica para o GitHub Actions (Secrets do repositório):"
echo "   S3_BUCKET=${BUCKET_NAME}"
echo "   CLOUDFRONT_DISTRIBUTION_ID=<ID_GERADO_NO_CLOUDFRONT>"
echo "========================================================================"
