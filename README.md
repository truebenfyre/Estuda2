# Estuda

Estuda é um projeto acadêmico em **React + TypeScript** (Next.js) para organizar missões de estudo, sessões de foco, progresso e recompensas pessoais. A interface funciona em desktop e celular.

A forma mais simples de explorar e desenvolver o projeto não exige uma conta Supabase.

## Começar a desenvolver

Requisitos: Node.js 22 a 26 e npm 10 ou mais recente. Se você usa `nvm`, execute `nvm use` nesta pasta.

```sh
npm ci
npm run dev:local
```

Abra http://127.0.0.1:3210/login e escolha **Entrar no modo local**. Alterações no código recarregam automaticamente. Não é necessário email nem senha.

O progresso local fica em `.local/student-state.json` e permanece depois de sair da conta ou reiniciar o servidor. O segredo da sessão e os dados são ignorados pelo Git. Todos os navegadores do computador usam o mesmo perfil local de teste. Não exponha esse servidor por túnel ou proxy.

Para testar a versão otimizada de produção localmente:

```sh
npm run build
npm run start:local
```

`npm start` e `npm run dev` executam o caminho normal do Supabase e não habilitam a entrada local de teste.

## Verificar uma mudança

```sh
npm test
npm run check
npm run build
```

Os testes cobrem regras de domínio, fluxos da interface, sessões locais assinadas e isolamento RLS em um PostgreSQL embutido. Os testes embutidos não provam que um projeto Supabase real foi configurado corretamente.

## Mapa do projeto

- `app/` contém as **páginas** (cada rota tem seu `page.tsx`), ações de autenticação e APIs.
- `components/` contém os componentes React, organizados por assunto (`ui`, `layout`, `missions`, `screens`, `auth`, `forms`...).
- `hooks/` contém os hooks customizados (`useNow`, `useStudentData`, `useTimerTick`, `useTheme`, `usePageFocus`).
- `context/` contém o Context que entrega o estado do app aos componentes (`useStudy`).
- `lib/types.ts` descreve os tipos do domínio; `lib/model.ts` concentra o modelo de dados e as regras de estudo.
- `supabase/migrations/` contém o esquema do banco e as políticas RLS.
- `tests/` contém verificações de domínio, fluxo, sessão local e RLS.
- `docs/architecture.md` explica os caminhos dos dados e limites importantes.
- `AGENTS.md` orienta agentes de programação sobre regras e verificações a preservar.

## Trabalho final de Front-end Frameworks

Tema escolhido: **organização de estudos com missões, foco e recompensas** (Estuda).

### Requisitos mínimos

| Requisito | Como o projeto atende |
|---|---|
| React.js com **TypeScript** | 100% do código da aplicação e dos testes está em `.ts`/`.tsx` (`allowJs` desligado e `strict` ligado; `npm run check` valida). |
| **8+ componentes** funcionais | Mais de 30 componentes funcionais em `components/` (lista abaixo). |
| **5+ páginas** distintas | 5 páginas privadas (`/meu-dia`, `/missoes`, `/materias`, `/recompensas`, `/conquistas`) + `/login` e `/recuperar-senha`, cada uma em seu `app/<rota>/page.tsx`. |
| **4+ hooks** diferentes | `useState`, `useEffect`, `useRef`, `useId`, `useContext`, `useMemo`, `useCallback` e 6 hooks customizados (`useStudy`, `useNow`, `useStudentData`, `useTimerTick`, `useTheme`, `usePageFocus`). |
| Backend/API (extra) | Rotas de API do Next.js (`app/api/*`) com persistência local em arquivo e **Supabase** (Postgres + RLS + autenticação). |

### Integrantes e componentes (preencha os nomes)

Cada integrante apresenta e explica 2 componentes. 

| Integrante | Componente 1 | Componente 2 |
|---|---|---|
| Aluno 1 Davi Lucas Cruz Paz/01800210 `Modal` (`components/ui/modal.tsx`) — `useRef`, `useId`, `useEffect` | `ProgressBar` (`components/ui/progress-bar.tsx`) — props e estilo dinâmico |
| Aluno 2 Ryan Rodrigues de Medeiros/01795192| `MissionCard` (`components/missions/mission-card.tsx`) — Context e eventos | `FocusTimer` (`components/missions/focus-timer.tsx`) — `useMemo` |
| Aluno 3 Peterson Tavares Bello/01794713| `Navigation` (`components/layout/navigation.tsx`) — roteamento e `Link` | `TopBar` (`components/layout/top-bar.tsx`) — Context e ações |
| Aluno 4 Arthur Alves Patrício de Carvalho 01805701 `AuthForm` (`components/auth/auth-form.tsx`) — formulário e `async` | `EntryCard` (`components/auth/entry-card.tsx`) — `useState` e `useEffect` |
| Aluno 5 Kayky de Sousa Figuerêdo/01797264| `ModalHost` (`components/forms/modal-host.tsx`) — formulários tipados | `AppShell` (`components/layout/app-shell.tsx`) — composição com `children` |

Componentes de apoio (usados pelos de cima): `Logo`, `EmptyState`, `Sidebar`, `PageHeader`, `SidePanel`, `DaySummary`, `SubjectCard`, `RewardCard`, `AchievementCard`, `LoginScreen`, as cinco telas em `components/screens/` e os campos de formulário em `components/forms/modal-fields.tsx`.

### Como a aplicação se organiza (para a apresentação)

1. Cada rota (`app/<rota>/page.tsx`) renderiza a sua **tela** (ex.: `/missoes` → `MissoesScreen`).
2. `app/layout.tsx` envolve tudo no `RouterApp`, que liga o app ao roteador do Next.js.
3. `StudyApp` guarda o estado e o entrega a todos os componentes pelo **Context** (`useStudy`).
4. `AppShell` desenha menu, topo e painel lateral e encaixa a tela da rota no meio (`children`).
5. As regras do jogo (XP, moedas, nível) ficam em `lib/model.ts`, fora dos componentes.

### Prints das telas

Os Prints estão na pasta docs/prints




A migração guarda um documento JSON versionado por usuário e aplica propriedade com RLS. As rotas de servidor verificam a sessão em vez de confiar em um identificador enviado pelo navegador. Dados antigos do navegador nunca são enviados automaticamente; a importação exige um destino vazio e confirmação explícita.

## Regras atuais do produto

- Uma missão concede 25 XP e 10 moedas na primeira conclusão.
- Reabrir, concluir novamente ou excluir uma missão não concede o prêmio outra vez.
- Cada nível exige 100 XP.
- Resgatar uma recompensa pessoal gasta moedas sem alterar XP ou nível.
- O timer registra sessões de foco, mas não valida o aprendizado nem concede XP.
- Conquistas são derivadas da atividade registrada.


