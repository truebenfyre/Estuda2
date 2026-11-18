# Arquitetura

## Caminhos de execução

A aplicação tem dois caminhos de dados por trás da mesma interface:

1. `components/router-app.tsx` escolhe o transporte a partir da conta verificada.
2. `components/study-app.tsx` guarda o estado, o entrega pelo Context (`context/study-context.ts`) e decide se mostra erro, entrada, carregamento ou o app.
3. Cada rota (`app/<rota>/page.tsx`) renderiza uma tela de `components/screens/`, encaixada pelo `AppShell`.
4. `lib/model.ts` valida o estado e aplica todas as transições de domínio.
5. A API escolhida recarrega o estado salvo, aplica a transição no servidor e retorna a nova revisão.

O teste local usa `app/api/local/*`, uma sessão assinada em cookie HttpOnly e `.local/student-state.json`. Ele só é habilitado por `scripts/local-server.ts`, limitado ao loopback e indisponível na Vercel.

Contas reais usam cookies Supabase SSR, `app/api/state/route.ts` e `student_states`. A migração versionada habilita RLS para que cada usuário autenticado leia e altere apenas sua própria linha. O navegador nunca escolhe o identificador do usuário.

## Áreas principais

- `app/`: rotas Next.js, ações e callback de autenticação e APIs.
- `components/`: componentes React por assunto; `screens/` tem uma tela por página.
- `hooks/`: hooks customizados (dados do servidor, relógio, timer, tema, foco da página).
- `context/study-context.ts`: Context e o hook `useStudy`.
- `lib/types.ts`: tipos do domínio, das ações e das conexões.
- `lib/model.ts`: modelo versionado, validação, cálculos e regras de negócio.
- `lib/cloud.ts`: transportes do cliente para as APIs local e Supabase.
- `lib/supabase/server.ts`: cliente Supabase no servidor e busca da conta verificada.
- `proxy.ts`: renovação de sessão e proteção das rotas privadas.
- `supabase/migrations/`: esquema reproduzível do banco e políticas RLS.
- `tests/`: testes de domínio, interface, sessão local e RLS em PostgreSQL isolado.
- `design/approved-reference.html`: referência visual preservada, fora do código executado pela aplicação.

## Estado e concorrência

Todo o estado do estudante é um documento JSON versionado. Cada cópia salva possui uma revisão numérica. Uma gravação envia a última revisão conhecida e falha com conflito se outra aba ou dispositivo tiver gravado antes. Os históricos de prêmios e resgates são registros imutáveis usados para impedir prêmios duplicados e preservar valores passados.

## Limites conhecidos

- Supabase está preparado, mas ainda não foi verificado com um projeto real.
- O modo local é um único perfil de teste compartilhado pelos navegadores do computador.
- `app/globals.css` é grande; divida-o gradualmente quando uma mudança relacionada justificar a extração.
- Agendamento por data, sugestões prontas de missões, recursos sociais, ranking e IA estão fora do escopo atual.
