/**
 * AWS Cloud Architecture Live Viewer
 * Interactive simulation and live visualization of featured AWS projects:
 * 1. Loterias Sim (Serverless Event-Driven AI & Betting Pipeline)
 * 2. iRacing TMP (Real-Time Telemetry & WebSockets Platform)
 * 3. BeautyOps (Mobile-First Hybrid FinOps Scale-to-Zero SaaS)
 */

class AWSArchitectureViewer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentProject = 'loterias-sim';
    this.activeScenario = null;
    this.animationTimers = [];
    this.selectedNodeId = null;

    this.projects = {
      'loterias-sim': {
        title: 'Loterias Sim — Serverless & Event-Driven AI Pipeline',
        iac: 'Terraform (loterias-infra) • GitHub Actions OIDC',
        region: 'sa-east-1 (SP) / us-east-1 (ACM/CDN)',
        defaultInspector: {
          title: 'Visão Geral da Arquitetura — Loterias Sim',
          iac: 'loterias-infra / ARQUITETURA.md',
          desc: 'Plataforma 100% serverless construída com IaC no Terraform para simulação, apuração diária de loterias e engine estatístico preditivo.',
          specs: [
            { label: 'Compute Principal', value: 'AWS Lambda (Node20 / Py3.12)' },
            { label: 'Ingress & API', value: 'API Gateway HTTP API + CloudFront' },
            { label: 'Orquestração', value: 'Step Functions + EventBridge' },
            { label: 'Persistência & Filas', value: 'DynamoDB + SQS DLQ + S3' }
          ]
        },
        scenarios: [
          { id: 'aposta', label: 'Simular Aposta (POST /jogos)', icon: '⚡' },
          { id: 'apuracao', label: 'Simular Apuração (07:00 BRT)', icon: '🕒' },
          { id: 'ml', label: 'Simular Pipeline ML (07:05 BRT)', icon: '🤖' }
        ],
        nodes: [
          {
            id: 'user',
            tier: 0,
            title: 'Cliente Web / PWA',
            subtitle: 'Next.js 16 Static SPA',
            meta: 'HTTPS • loteriassim.com.br',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
            details: {
              title: 'Frontend — Next.js 16 Estático',
              iac: 'loterias-sim-web / hosting.tf',
              desc: 'Aplicação web Next.js exportada estaticamente, servida globalmente com baixa latência.',
              specs: [
                { label: 'Domínio', value: 'loteriassim.com.br' },
                { label: 'Roteamento', value: 'Route 53 DNS Alias' },
                { label: 'Protocolo', value: 'HTTP/2 + HTTP/3 TLS 1.3' },
                { label: 'CI/CD Deploy', value: 'GitHub OIDC Role (Least Priv)' }
              ]
            }
          },
          {
            id: 'cloudfront',
            tier: 0,
            title: 'CloudFront CDN + S3',
            subtitle: 'Origin Access Control (OAC)',
            meta: 'WAF Rate Limit • PriceClass_100',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
            details: {
              title: 'CDN & Storage Estático — CloudFront + S3 Privado',
              iac: 'loterias-infra/hosting.tf',
              desc: 'O bucket S3 privado não possui acesso público; todo tráfego passa autenticado pelo CloudFront via OAC com proteção WAF.',
              specs: [
                { label: 'Segurança Origem', value: 'AWS OAC (Origin Access Control)' },
                { label: 'Certificado SSL', value: 'ACM us-east-1 Wildcard' },
                { label: 'Invalidação CI', value: 'Automática pós-push na main' },
                { label: 'Custo Ocioso', value: 'Free Tier CDN (~$0.80/mês)' }
              ]
            }
          },
          {
            id: 'apigw',
            tier: 1,
            title: 'API Gateway HTTP API',
            subtitle: 'sim-api Entrypoint',
            meta: 'CORS Restrito • Throttling',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h6M12 9v6"/></svg>`,
            details: {
              title: 'API Gateway HTTP API (ID: p49mq9wj2d)',
              iac: 'loterias-infra/main.tf',
              desc: 'Gateway HTTP API de baixa latência e menor custo que o REST API, roteando requisições GET e POST para funções Lambda.',
              specs: [
                { label: 'Endpoints', value: 'GET /resultados, POST /jogos' },
                { label: 'Proteção CORS', value: 'loteriassim.com.br' },
                { label: 'Integração', value: 'AWS_PROXY Lambda' },
                { label: 'Latência Média', value: '< 15ms no gateway' }
              ]
            }
          },
          {
            id: 'lambda_api',
            tier: 1,
            title: 'Lambda sim-api',
            subtitle: 'Runtime: nodejs20.x',
            meta: 'Secrets Manager • IAM Role',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M10 12l-2 4h4l-2 4"/></svg>`,
            details: {
              title: 'Microserviço sim-api (AWS Lambda Node.js 20)',
              iac: 'loterias-sim-api',
              desc: 'Gera apostas estatísticas, cria vouchers únicos (UUID), lê histórico no DynamoDB e publica apostas na fila SQS.',
              specs: [
                { label: 'Runtime', value: 'Node.js 20 (ARM64)' },
                { label: 'Segredos', value: 'AWS Secrets Manager (Tokens)' },
                { label: 'Contrato SQS', value: 'GameDto JSON Canônico' },
                { label: 'Permissões IAM', value: 'Least-privilege por ARN' }
              ]
            }
          },
          {
            id: 'sqs',
            tier: 2,
            title: 'Amazon SQS Queue',
            subtitle: 'loterias-app-queue + DLQ',
            meta: 'Assíncrono • Batch Failures',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
            details: {
              title: 'Fila SQS — Desacoplamento de Apostas',
              iac: 'loterias-infra/messaging.tf',
              desc: 'Fila SQS com Dead Letter Queue (DLQ) configurada para ReportBatchItemFailures, garantindo zero perda de apostas.',
              specs: [
                { label: 'Retenção', value: '4 dias (14 na DLQ)' },
                { label: 'Visibilidade Timeout', value: '30 segundos' },
                { label: 'Idempotência', value: 'Voucher UUID chave de deduplicação' },
                { label: 'Consumidor', value: 'Lambda validator (Python 3.12)' }
              ]
            }
          },
          {
            id: 'eventbridge',
            tier: 2,
            title: 'EventBridge Schedulers',
            subtitle: 'Crons 06:30 • 07:00 • 07:05',
            meta: 'Orquestração Diária BRT',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
            details: {
              title: 'Amazon EventBridge — Agendamentos de Produção',
              iac: 'loterias-infra/scheduling.tf',
              desc: 'Dispara pontualmente as rotinas diárias de captura de resultados, apuração de apostas via Step Functions e recálculo de IA.',
              specs: [
                { label: '06:30 BRT', value: 'Lambda capture -> S3 Histórico' },
                { label: '07:00 BRT', value: 'Step Functions loterias-app-results' },
                { label: '07:05 BRT', value: 'Lambda ml-engine -> Análise Preditiva' },
                { label: 'Fuso Horário', value: 'America/Sao_Paulo nativo' }
              ]
            }
          },
          {
            id: 'stepfunctions',
            tier: 2,
            title: 'Step Functions Orchestrator',
            subtitle: 'loterias-app-results',
            meta: 'Apuração Não-Destrutiva',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
            details: {
              title: 'AWS Step Functions — Orquestrador de Apuração',
              iac: 'loterias-infra/scheduling.tf',
              desc: 'Máquina de estados que gerencia a apuração diária de apostas pendentes de forma idempotente e não-destrutiva.',
              specs: [
                { label: 'Fluxo', value: 'Scan PENDING -> Check Oficial -> Done' },
                { label: 'Tratamento Erros', value: 'Retry exponencial + Alerta CW' },
                { label: 'Idempotência', value: 'Mantém PENDING se concurso não sorteado' },
                { label: 'Task Lambda', value: 'loterias-core (Python 3.12)' }
              ]
            }
          },
          {
            id: 'dynamo',
            tier: 3,
            title: 'Amazon DynamoDB Tables',
            subtitle: 'Game • Outcomes • Prediction',
            meta: 'On-Demand • PK=voucher / id',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
            details: {
              title: 'DynamoDB — Camada NoSQL Serverless',
              iac: 'loterias-infra/dynamodb.tf',
              desc: 'Três tabelas sob demanda (Pay-per-Request): Game (apostas), LoteriasOutcomes (acertos) e LoteriasPredictiveData (sugestões ML).',
              specs: [
                { label: 'Modo Cobrança', value: 'PAY_PER_REQUEST (Zero ocioso)' },
                { label: 'Chave Game', value: 'PK = voucher (UUID)' },
                { label: 'Chave Predição', value: 'PK = LATEST_PREDICTION' },
                { label: 'Status Aposta', value: 'PENDING -> DONE' }
              ]
            }
          },
          {
            id: 'ses',
            tier: 3,
            title: 'Amazon SES Transactional',
            subtitle: 'Domínio loteriassim.com.br',
            meta: 'EasyDKIM • SPF • DMARC',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
            details: {
              title: 'Amazon Simple Email Service (SES de Produção)',
              iac: 'loterias-infra/ses.tf',
              desc: 'Domínio verificado com EasyDKIM e SPF/DMARC na zona Route 53, enviando recibos de aposta e alertas de premiação aos usuários.',
              specs: [
                { label: 'Remetente', value: 'nao-responda@loteriassim.com.br' },
                { label: 'Reputação', value: 'Produção fora do Sandbox' },
                { label: 'Gatilho 1', value: 'POST /jogos (Confirmação opt-in)' },
                { label: 'Gatilho 2', value: 'Step Functions core (Notificação acertos)' }
              ]
            }
          }
        ],
        flows: {
          aposta: [
            { from: 'user', to: 'cloudfront', label: '1. POST /jogos (HTTPS)' },
            { from: 'cloudfront', to: 'apigw', label: '2. Roteamento Edge OAC' },
            { from: 'apigw', to: 'lambda_api', label: '3. Invoca sim-api Node20' },
            { from: 'lambda_api', to: 'sqs', label: '4. Publica GameDto no SQS' },
            { from: 'sqs', to: 'dynamo', label: '5. Validator grava PENDING' },
            { from: 'lambda_api', to: 'ses', label: '6. Envia e-mail de confirmação' }
          ],
          apuracao: [
            { from: 'eventbridge', to: 'stepfunctions', label: '1. Cron 07:00 BRT dispara apuração' },
            { from: 'stepfunctions', to: 'dynamo', label: '2. Scan apostas status=PENDING' },
            { from: 'stepfunctions', to: 'dynamo', label: '3. Grava LoteriasOutcomes + DONE' },
            { from: 'stepfunctions', to: 'ses', label: '4. SES notifica acertos e prêmio' }
          ],
          ml: [
            { from: 'eventbridge', to: 'dynamo', label: '1. Cron 06:30 captura resultados S3' },
            { from: 'eventbridge', to: 'dynamo', label: '2. Cron 07:05 ml-engine recalcula stats' },
            { from: 'dynamo', to: 'cloudfront', label: '3. Web atualiza LATEST_PREDICTION' }
          ]
        }
      },

      'iracing-tmp': {
        title: 'iRacing TMP — Real-Time Telemetry & Strategy WebSockets',
        iac: 'Terraform (iracing-tmp/terraform) • ALB + ECS Fargate',
        region: 'sa-east-1 (SP) / us-east-1 (ACM Wildcard)',
        defaultInspector: {
          title: 'Visão Geral — iRacing Team Management Platform',
          iac: 'iracing-tmp/docs/ARCHITECTURE.md',
          desc: 'Plataforma SaaS para equipes de sim racing no iRacing com ingestão de telemetria da Garage61 e Live Strategy Board em WebSockets sub-segundo.',
          specs: [
            { label: 'Load Balancer', value: 'ALB com upgrade WebSocket (ws://)' },
            { label: 'Compute Cluster', value: 'ECS Fargate (FastAPI app-api + workers)' },
            { label: 'Cache & Pub/Sub', value: 'ElastiCache Redis (Fan-out WS)' },
            { label: 'Banco Relacional', value: 'RDS PostgreSQL Multi-AZ + TimescaleDB' }
          ]
        },
        scenarios: [
          { id: 'live_board', label: 'Simular Live Board (WebSockets)', icon: '🏎️' },
          { id: 'telemetry_ingest', label: 'Simular Ingestão Garage61 (.sto)', icon: '📊' }
        ],
        nodes: [
          {
            id: 'driver',
            tier: 0,
            title: 'Equipe / Pit Wall SPA',
            subtitle: 'React 19 + Vite Client',
            meta: 'iracing-tm.com.br • WS Connect',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`,
            details: {
              title: 'Painel do Engenheiro & Piloto — React 19',
              iac: 'apps/web',
              desc: 'Interface SPA com painéis de telemetria em tempo real, cofre de setups (.sto) e cálculo de combustível/janela de pit em endurance.',
              specs: [
                { label: 'Protocolo Live', value: 'WebSocket (ALB Sticky Upgrade)' },
                { label: 'Cache Frontend', value: 'React Query + SWR' },
                { label: 'Autenticação', value: 'OAuth2 + JWT (HttpOnly Cookie)' },
                { label: 'Hospedagem', value: 'S3 + CloudFront WAF' }
              ]
            }
          },
          {
            id: 'alb',
            tier: 1,
            title: 'Application Load Balancer',
            subtitle: 'HTTP/2 + WebSockets Sticky',
            meta: 'Subnet Pública • SSL Offload',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
            details: {
              title: 'AWS Application Load Balancer (ALB)',
              iac: 'iracing-tmp/terraform/app_hosting.tf',
              desc: 'Rotea tráfego REST (/api/v1) e mantém conexões WebSocket persistentes para o Live Board de corridas.',
              specs: [
                { label: 'Listeners', value: 'HTTPS 443 -> Target Group ECS' },
                { label: 'WebSockets', value: 'Suporte nativo a upgrade ws://' },
                { label: 'Health Check', value: 'GET /api/health no Fargate' },
                { label: 'Segurança', value: 'SG restrito à CDN / origens' }
              ]
            }
          },
          {
            id: 'ecs_fargate',
            tier: 1,
            title: 'ECS Fargate Cluster',
            subtitle: 'FastAPI Async + Workers',
            meta: 'Auto-scaling CPU/Memória',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
            details: {
              title: 'AWS ECS Fargate — Container Compute',
              iac: 'iracing-tmp/terraform/main.tf',
              desc: 'Tasks stateless executando FastAPI em Python Async. Scale out automático durante campeonatos e provas de 24h.',
              specs: [
                { label: 'Serviço app-api', value: 'API REST + WebSocket Gateway' },
                { label: 'Serviço workers', value: 'Polling iRacing & Garage61' },
                { label: 'Subnets', value: 'Subnets Privadas VPC' },
                { label: 'Logs', value: 'CloudWatch Logs com retenção' }
              ]
            }
          },
          {
            id: 'redis',
            tier: 2,
            title: 'ElastiCache Redis',
            subtitle: 'Pub/Sub Broker + Cache',
            meta: 'Canal: board:{raceId}',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
            details: {
              title: 'Amazon ElastiCache Redis — Pub/Sub & Sessões',
              iac: 'iracing-tmp/terraform',
              desc: 'Permite fan-out instantâneo para centenas de clientes no Live Strategy Board. Qualquer task ECS pode responder a qualquer cliente WS.',
              specs: [
                { label: 'Canal Pub/Sub', value: 'PUBLISH board:{raceId}' },
                { label: 'Sessão JWT', value: 'Armazenamento de Refresh Tokens' },
                { label: 'Latência PubSub', value: '< 2ms entre tasks Fargate' },
                { label: 'Isolamento', value: 'SG aceita 6379 apenas do ECS' }
              ]
            }
          },
          {
            id: 'rds_postgres',
            tier: 3,
            title: 'RDS PostgreSQL + Timescale',
            subtitle: 'Multi-AZ Database',
            meta: 'Telemetria Voltas & Setups',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
            details: {
              title: 'Amazon RDS PostgreSQL 16 + TimescaleDB',
              iac: 'iracing-tmp/terraform/rds.tf',
              desc: 'Armazena cadastros de ligas, perfis de pilotos e utiliza hiper-tabelas do TimescaleDB para consultas ultrarrápidas de telemetria.',
              specs: [
                { label: 'Extensão', value: 'TimescaleDB Time-Series' },
                { label: 'Disponibilidade', value: 'Multi-AZ em Produção' },
                { label: 'Backups', value: 'Automatizados diários + Snapshots' },
                { label: 'Acesso', value: 'Exclusivo via VPC SG do ECS' }
              ]
            }
          },
          {
            id: 'garage61_ext',
            tier: 3,
            title: 'Garage61 & iRacing API',
            subtitle: 'OAuth2 Telemetry Feed',
            meta: 'Polling / Webhook Ingest',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
            details: {
              title: 'Integração Externa — Garage61 & iRacing Data API',
              iac: 'docs/garage61 / API_INTEGRATION.md',
              desc: 'Conectores isolados na camada integrations/ para busca de dados de voltas, consumo de combustível e arquivos de setup .sto.',
              specs: [
                { label: 'Autenticação', value: 'OAuth2 com rotação de tokens' },
                { label: 'Ingestão', value: 'Fila SQS assíncrona' },
                { label: 'Isolamento', value: 'Adaptador anti-corrupção' },
                { label: 'Segredos API', value: 'AWS Secrets Manager' }
              ]
            }
          }
        ],
        flows: {
          live_board: [
            { from: 'garage61_ext', to: 'ecs_fargate', label: '1. Ingestão Telemetria & Posições' },
            { from: 'ecs_fargate', to: 'redis', label: '2. PUBLISH board:{raceId}' },
            { from: 'redis', to: 'ecs_fargate', label: '3. Fan-out para GW WebSockets' },
            { from: 'ecs_fargate', to: 'alb', label: '4. Push sub-segundo via ALB' },
            { from: 'alb', to: 'driver', label: '5. Pit Wall Board atualizado' }
          ],
          telemetry_ingest: [
            { from: 'driver', to: 'alb', label: '1. Upload Setup (.sto) / Lote Voltas' },
            { from: 'alb', to: 'ecs_fargate', label: '2. Validação no FastAPI' },
            { from: 'ecs_fargate', to: 'rds_postgres', label: '3. Persistência TimescaleDB / RDS' }
          ]
        }
      },

      'beautyops': {
        title: 'BeautyOps — Mobile-First Hybrid FinOps SaaS',
        iac: 'Terraform (beautyops/infra) • FinOps Scale-to-Zero',
        region: 'sa-east-1 (SP) • Aurora Serverless v2',
        defaultInspector: {
          title: 'Visão Geral — BeautyOps SaaS',
          iac: 'beautyops/infra / docs/architecture.md',
          desc: 'SaaS mobile-first para profissionais de beleza de eventos com arquitetura híbrida focada em eficiência FinOps (Aurora auto-pause).',
          specs: [
            { label: 'Banco FinOps', value: 'Aurora Serverless v2 (min 0 ACU)' },
            { label: 'Compute App', value: 'ECS Fargate + ALB' },
            { label: 'Autenticação', value: 'AWS Cognito User Pool JWKS' },
            { label: 'Assinaturas & Pix', value: 'Clicksign API + Pix Integrado' }
          ]
        },
        scenarios: [
          { id: 'flow_evento', label: 'Simular Proposta & Contrato Pix', icon: '💄' },
          { id: 'finops', label: 'Simular FinOps Scale-to-Zero (0 ACU)', icon: '💰' }
        ],
        nodes: [
          {
            id: 'artist',
            tier: 0,
            title: 'Profissional / Cliente',
            subtitle: 'Mobile-First PWA React 19',
            meta: 'app.beautyops.com.br',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
            details: {
              title: 'Frontend Mobile-First PWA — React 19',
              iac: 'app/src',
              desc: 'Interface pensada para uso em smartphone no dia de eventos, gerindo propostas, contratos com Clicksign e cobranças Pix.',
              specs: [
                { label: 'UX', value: 'Mobile-First shadcn/ui Premium' },
                { label: 'PWA', value: 'Instalável com suporte offline' },
                { label: 'Domínios', value: 'beautyops.com.br & app.beautyops.com.br' },
                { label: 'CDN', value: 'CloudFront OAC + WAF' }
              ]
            }
          },
          {
            id: 'cognito',
            tier: 1,
            title: 'AWS Cognito User Pool',
            subtitle: 'Auth + Custom Message SES',
            meta: 'JWKS Verificado no FastAPI',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
            details: {
              title: 'Amazon Cognito — Identidade & Segurança',
              iac: 'beautyops/infra/app_cognito.tf',
              desc: 'Autenticação segura via Cognito com Lambda Custom Message para e-mails de cadastro em HTML branded com remetente no-reply@beautyops.com.br.',
              specs: [
                { label: 'Validação Backend', value: 'JWKS (JSON Web Key Set)' },
                { label: 'Custom Message', value: 'Lambda Python customizada via SES' },
                { label: 'Segurança', value: 'Proteção contra força bruta' },
                { label: 'Custo', value: 'Free Tier até 50.000 MAU' }
              ]
            }
          },
          {
            id: 'fargate_api',
            tier: 1,
            title: 'ECS Fargate FastAPI',
            subtitle: 'SQLAlchemy Async Engine',
            meta: 'VPC Privada 2 AZs (s/ NAT)',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
            details: {
              title: 'Backend FastAPI Async (ECS Fargate)',
              iac: 'beautyops/infra/app_ecs.tf',
              desc: 'API Python assíncrona de alta performance em VPC isolada em 2 AZs, comunicando-se diretamente com Aurora Serverless sem custos de NAT Gateway.',
              specs: [
                { label: 'Framework', value: 'FastAPI + SQLAlchemy Async + Alembic' },
                { label: 'FinOps Toggle', value: 'Teardown via terraform var app_active' },
                { label: 'Integração Assinatura', value: 'Clicksign v3 Contrato Digital' },
                { label: 'Subnets', value: 'Public ALB -> Fargate em SG travado' }
              ]
            }
          },
          {
            id: 'aurora_db',
            tier: 2,
            title: 'Aurora Serverless v2',
            subtitle: 'PostgreSQL 16 Engine',
            meta: 'FinOps: min 0 ACU (Auto-Pause)',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
            details: {
              title: 'Amazon Aurora Serverless v2 (PostgreSQL 16)',
              iac: 'beautyops/infra/app_db.tf',
              desc: 'Destaque FinOps da arquitetura: configurado com capacidade mínima 0 ACU, pausando automaticamente em inatividade e zerando o custo computacional de DB.',
              specs: [
                { label: 'Capacidade Mínima', value: '0 ACU (Auto-pause total ocioso)' },
                { label: 'Escala Ativa', value: 'Escala em milissegundos sob requisição' },
                { label: 'Economia FinOps', value: '~100% de economia fora de pico' },
                { label: 'Versão Engine', value: 'Aurora PostgreSQL 16' }
              ]
            }
          },
          {
            id: 'ses_clicksign',
            tier: 2,
            title: 'Clicksign + Pix + SES',
            subtitle: 'Contratos Digitais & Cobrança',
            meta: 'Assinatura Qualificada bilateral',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
            details: {
              title: 'Integrações Operacionais — Contratos & Cobrança Pix',
              iac: 'beautyops-spec.md / Sprint 2b & 3',
              desc: 'Geração automática de contratos com assinatura bilateral qualificada pela Clicksign v3, QR Code Pix copia-e-cola e lembretes transacionais via SES.',
              specs: [
                { label: 'Assinatura', value: 'Clicksign v3 API com fecho/cancelamento' },
                { label: 'Pagamentos', value: 'Pix Estruturado com controle D-30/D-7' },
                { label: 'Notificações', value: 'E-mails Branded SES + Web Push VAPID' },
                { label: 'Remetente SES', value: 'no-reply@beautyops.com.br' }
              ]
            }
          }
        ],
        flows: {
          flow_evento: [
            { from: 'artist', to: 'cognito', label: '1. Autenticação Segura JWT (JWKS)' },
            { from: 'artist', to: 'fargate_api', label: '2. Envio de Proposta / Contrato' },
            { from: 'fargate_api', to: 'aurora_db', label: '3. Persiste no Aurora Serverless v2' },
            { from: 'fargate_api', to: 'ses_clicksign', label: '4. Dispara Clicksign & Pix Copia-e-Cola' }
          ],
          finops: [
            { from: 'artist', to: 'fargate_api', label: '1. Requisição chega após inatividade' },
            { from: 'fargate_api', to: 'aurora_db', label: '2. Aurora Serverless v2 acorda de 0 ACU (instante)' },
            { from: 'aurora_db', to: 'fargate_api', label: '3. Banco processa em ms sem custo idle' }
          ]
        }
      }
    };
  }

  init() {
    if (!this.container) return;
    this.renderSection();
    this.bindEvents();
    this.selectProject('loterias-sim');
  }

  renderSection() {
    this.container.innerHTML = `
      <div class="aws-arch-section">
        <h2 class="section-title">ARQUITETURAS CLOUD AWS (LIVE WORKFLOWS)</h2>
        <p class="section-desc">
          Engenharia de infraestrutura na AWS dos principais projetos em destaque. Todas as topologias são provisionadas via <strong>Terraform (IaC)</strong> com least-privilege IAM e pipelines CI/CD automatizados. Clique nas guias e simule os fluxos ao vivo em tempo real.
        </p>

        <!-- Tabs Switcher -->
        <div class="arch-tabs" id="archTabs">
          <button class="arch-tab active" data-project="loterias-sim">
            <span>🎲</span> Loterias Sim
          </button>
          <button class="arch-tab" data-project="iracing-tmp">
            <span>🏎️</span> iRacing TMP
          </button>
          <button class="arch-tab" data-project="beautyops">
            <span>💄</span> BeautyOps
          </button>
        </div>

        <!-- Header Banner -->
        <div class="arch-header-info">
          <div class="arch-project-meta">
            <span class="arch-project-title" id="archTitle">Loterias Sim — Serverless Pipeline</span>
            <span class="arch-badge iac" id="archIac">Terraform (loterias-infra)</span>
            <span class="arch-badge region" id="archRegion">sa-east-1</span>
          </div>
        </div>

        <!-- Action / Scenario Buttons -->
        <div class="arch-controls" id="archControls"></div>

        <!-- Interactive Canvas -->
        <div class="arch-canvas-wrapper" id="archCanvasWrapper">
          <svg class="arch-svg-overlay" id="archSvgOverlay"></svg>
          <div class="arch-tiers-grid" id="archTiersGrid"></div>
        </div>

        <!-- Inspector + Live Terminal -->
        <div class="arch-details-area">
          <!-- Inspector Panel -->
          <div class="arch-inspector-card" id="archInspector">
            <div class="arch-inspector-header">
              <span class="arch-inspector-title" id="inspTitle">Selecione um nó ou simulação</span>
              <span class="arch-inspector-iac" id="inspIac">AWS Resource</span>
            </div>
            <p class="arch-inspector-desc" id="inspDesc">Clique em qualquer serviço AWS no diagrama acima para inspecionar os detalhes de infraestrutura e IaC.</p>
            <div class="arch-inspector-specs" id="inspSpecs"></div>
          </div>

          <!-- Live Flow Terminal -->
          <div class="arch-terminal-card">
            <div class="arch-terminal-header">
              <span>/var/log/aws/live-architecture.log</span>
              <span>LIVE SYSTEM</span>
            </div>
            <div class="arch-terminal-logs" id="archTerminalLogs"></div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const tabs = this.container.querySelectorAll('.arch-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.selectProject(tab.dataset.project);
      });
    });

    // Re-render lines on resize
    window.addEventListener('resize', () => {
      this.drawSvgConnections();
    });
  }

  selectProject(projectId) {
    this.stopAllSimulations();
    this.currentProject = projectId;
    const proj = this.projects[projectId];
    if (!proj) return;

    document.getElementById('archTitle').textContent = proj.title;
    document.getElementById('archIac').textContent = proj.iac;
    document.getElementById('archRegion').textContent = proj.region;

    this.renderControls(proj.scenarios);
    this.renderNodes(proj.nodes);
    this.updateInspector(proj.defaultInspector);

    // Initial terminal log
    this.clearLogs();
    this.log(`Arquitetura carregada: ${proj.title}`, 'highlight');
    this.log(`IaC Config: ${proj.iac} | Região: ${proj.region}`);
    this.log(`Selecione uma simulação acima ou clique nos serviços para inspecionar.`);

    setTimeout(() => {
      this.drawSvgConnections();
    }, 100);
  }

  renderControls(scenarios) {
    const container = document.getElementById('archControls');
    container.innerHTML = `<span class="arch-controls-label">SIMULAÇÕES AO VIVO:</span>`;

    scenarios.forEach(scen => {
      const btn = document.createElement('button');
      btn.className = 'arch-btn';
      btn.dataset.scenario = scen.id;
      btn.innerHTML = `<span class="play-icon">▶</span> <span>${scen.label}</span>`;
      btn.addEventListener('click', () => {
        this.runScenario(scen.id);
      });
      container.appendChild(btn);
    });
  }

  renderNodes(nodes) {
    const grid = document.getElementById('archTiersGrid');
    grid.innerHTML = '';

    nodes.forEach(node => {
      const card = document.createElement('div');
      card.className = 'arch-node';
      card.id = `node-${node.id}`;
      card.dataset.nodeId = node.id;

      card.innerHTML = `
        <div class="arch-node-header">
          <div class="arch-node-icon">${node.icon}</div>
          <div class="arch-node-status"></div>
        </div>
        <div class="arch-node-title">${node.title}</div>
        <div class="arch-node-subtitle">${node.subtitle}</div>
        <div class="arch-node-meta">${node.meta}</div>
      `;

      card.addEventListener('click', () => {
        this.updateInspector(node.details);
      });

      grid.appendChild(card);
    });
  }

  updateInspector(details) {
    if (!details) return;
    document.getElementById('inspTitle').textContent = details.title || 'AWS Service';
    document.getElementById('inspIac').textContent = details.iac || 'Terraform';
    document.getElementById('inspDesc').textContent = details.desc || '';

    const specsBox = document.getElementById('inspSpecs');
    specsBox.innerHTML = '';
    if (details.specs && details.specs.length) {
      details.specs.forEach(s => {
        specsBox.innerHTML += `
          <div class="arch-spec-item">
            <div class="arch-spec-label">${s.label}</div>
            <div class="arch-spec-value">${s.value}</div>
          </div>
        `;
      });
    }
  }

  drawSvgConnections(activeScenarioId = null) {
    const svg = document.getElementById('archSvgOverlay');
    const wrapper = document.getElementById('archCanvasWrapper');
    if (!svg || !wrapper) return;

    svg.innerHTML = '';
    const proj = this.projects[this.currentProject];
    if (!proj || !proj.flows) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const flowsToDraw = activeScenarioId && proj.flows[activeScenarioId]
      ? proj.flows[activeScenarioId]
      : (proj.flows[Object.keys(proj.flows)[0]] || []);

    flowsToDraw.forEach((step, idx) => {
      const fromNode = document.getElementById(`node-${step.from}`);
      const toNode = document.getElementById(`node-${step.to}`);
      if (!fromNode || !toNode) return;

      const fromRect = fromNode.getBoundingClientRect();
      const toRect = toNode.getBoundingClientRect();

      const x1 = fromRect.left + fromRect.width / 2 - wrapperRect.left;
      const y1 = fromRect.top + fromRect.height / 2 - wrapperRect.top;
      const x2 = toRect.left + toRect.width / 2 - wrapperRect.left;
      const y2 = toRect.top + toRect.height / 2 - wrapperRect.top;

      // Curved bezier
      const dx = x2 - x1;
      const dy = y2 - y1;
      const cx1 = x1 + dx * 0.35;
      const cy1 = y1 - 25;
      const cx2 = x1 + dx * 0.65;
      const cy2 = y2 - 25;

      const pathData = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('class', activeScenarioId ? 'arch-path active' : 'arch-path');
      path.setAttribute('id', `path-${idx}`);
      svg.appendChild(path);
    });
  }

  runScenario(scenarioId) {
    this.stopAllSimulations();
    const proj = this.projects[this.currentProject];
    const steps = proj.flows[scenarioId];
    if (!steps) return;

    // Highlight button
    document.querySelectorAll('.arch-btn').forEach(b => {
      b.classList.remove('running');
      if (b.dataset.scenario === scenarioId) b.classList.add('running');
    });

    this.drawSvgConnections(scenarioId);
    this.log(`--- INICIANDO FLUXO: ${scenarioId.toUpperCase()} ---`, 'success');

    const svg = document.getElementById('archSvgOverlay');
    const wrapper = document.getElementById('archCanvasWrapper');
    const wrapperRect = wrapper.getBoundingClientRect();

    steps.forEach((step, idx) => {
      const timer = setTimeout(() => {
        this.log(step.label, 'highlight');

        const fromNode = document.getElementById(`node-${step.from}`);
        const toNode = document.getElementById(`node-${step.to}`);
        if (fromNode) {
          fromNode.classList.add('active-pulse');
          setTimeout(() => fromNode.classList.remove('active-pulse'), 800);
        }

        if (toNode && idx === steps.length - 1) {
          setTimeout(() => {
            toNode.classList.add('active-pulse');
            setTimeout(() => toNode.classList.remove('active-pulse'), 800);
            this.log(`✅ Fluxo "${scenarioId}" concluído com sucesso.`, 'success');
          }, 600);
        }

        // Animate packet circle along path
        if (fromNode && toNode) {
          const fromRect = fromNode.getBoundingClientRect();
          const toRect = toNode.getBoundingClientRect();

          const x1 = fromRect.left + fromRect.width / 2 - wrapperRect.left;
          const y1 = fromRect.top + fromRect.height / 2 - wrapperRect.top;
          const x2 = toRect.left + toRect.width / 2 - wrapperRect.left;
          const y2 = toRect.top + toRect.height / 2 - wrapperRect.top;

          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          circle.setAttribute('r', '6');
          circle.setAttribute('class', 'arch-packet');
          circle.setAttribute('cx', x1);
          circle.setAttribute('cy', y1);
          svg.appendChild(circle);

          const startTime = performance.now();
          const duration = 650;

          const animatePacket = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            // Quadratic easing
            const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            const currentX = x1 + (x2 - x1) * ease;
            const currentY = y1 + (y2 - y1) * ease - Math.sin(progress * Math.PI) * 25;
            circle.setAttribute('cx', currentX);
            circle.setAttribute('cy', currentY);

            if (progress < 1) {
              requestAnimationFrame(animatePacket);
            } else {
              circle.remove();
            }
          };

          requestAnimationFrame(animatePacket);
        }
      }, idx * 850);

      this.animationTimers.push(timer);
    });
  }

  stopAllSimulations() {
    this.animationTimers.forEach(t => clearTimeout(t));
    this.animationTimers = [];
    document.querySelectorAll('.arch-btn').forEach(b => b.classList.remove('running'));
    document.querySelectorAll('.arch-node').forEach(n => n.classList.remove('active-pulse'));
  }

  log(msg, styleClass = '') {
    const box = document.getElementById('archTerminalLogs');
    if (!box) return;

    const time = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    const line = document.createElement('div');
    line.className = 'arch-log-line';
    line.innerHTML = `
      <span class="arch-log-time">[${time}]</span>
      <span class="arch-log-msg ${styleClass}">${msg}</span>
    `;
    box.appendChild(line);
    box.scrollTop = box.scrollHeight;
  }

  clearLogs() {
    const box = document.getElementById('archTerminalLogs');
    if (box) box.innerHTML = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const archViewer = new AWSArchitectureViewer('awsArchitectureSection');
  archViewer.init();
});
