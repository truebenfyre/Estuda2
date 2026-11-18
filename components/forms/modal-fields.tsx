import { AVATARS } from "../../lib/navigation";
import { RULES } from "../../lib/model";
import type { Mission, Profile, Reward, Subject } from "../../lib/types";


export function ImportFields({ email }: { email?: string }) {
  return (
    <>
      <p>
        Essa importação copia os dados locais antigos para <strong>{email}</strong>. A cópia
        original permanece no navegador. Contas com dados não serão sobrescritas.
      </p>
      <label>
        Digite o email da conta para confirmar
        <input name="confirmEmail" type="email" required autoComplete="off" />
      </label>
      <label className="em-import-consent">
        <input type="checkbox" required />
        Confirmo que os dados locais são meus e devem ir para esta conta.
      </label>
    </>
  );
}

export function DeleteFields({ item }: { item: Mission | Reward }) {
  return (
    <div className="em-delete-copy">
      <strong>{"title" in item ? item.title : item.name}</strong>
      <p>
        Essa ação remove o item. O histórico de XP, ouro e resgates já registrados permanece
        preservado.
      </p>
    </div>
  );
}

export function ProgressFields({ item }: { item: Mission }) {
  return (
    <>
      <p>{item.title}</p>
      <label>
        Quantidade de {item.unit} concluídos agora
        <input
          name="amount"
          type="number"
          min={1}
          max={item.goal - item.progress}
          step={1}
          defaultValue={1}
          required
          autoFocus
        />
      </label>
      <p className="em-help">
        {item.progress}/{item.goal} registrados. Ao atingir a meta, a missão é concluída.
      </p>
    </>
  );
}

export function ProfileFields({
  profile,
  email,
  local,
}: {
  profile: Profile;
  email?: string;
  local: boolean;
}) {
  return (
    <>
      <label>
        Como você quer ser chamado?
        <input name="name" defaultValue={profile.name} required maxLength={40} autoFocus />
      </label>
      <label>
        Seu avatar
        <select name="avatar" defaultValue={profile.avatar}>
          {AVATARS.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </label>
      <p className="em-help">
        Perfil de {email}. Alterações serão salvas {local ? "neste computador." : "no Supabase."}
      </p>
    </>
  );
}

export function SubjectFields({ item }: { item?: Subject }) {
  return (
    <label>
      Nome da matéria
      <input
        name="name"
        defaultValue={item?.name || ""}
        placeholder="Ex.: Matemática"
        required
        maxLength={40}
        autoFocus
      />
    </label>
  );
}

export function MissionFields({
  item,
  subjects,
  goalLocked,
}: {
  item?: Mission;
  subjects: Subject[];
  goalLocked: boolean;
}) {
  return (
    <>
      <label>
        Título
        <input
          name="title"
          defaultValue={item?.title || ""}
          required
          maxLength={80}
          placeholder="Ex.: Resolver exercícios de frações"
          autoFocus
        />
      </label>
      <label>
        Matéria
        <select name="subjectId" defaultValue={item?.subjectId || subjects[0]?.id}>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </label>
      <div className="em-fields">
        <label>
          Meta
          <input
            name="goal"
            type="number"
            min={1}
            max={10000}
            step={1}
            defaultValue={item?.goal || 5}
            required
            disabled={goalLocked}
          />
        </label>
        <label>
          Unidade
          <input
            name="unit"
            defaultValue={item?.unit || "exercícios"}
            maxLength={25}
            required
            placeholder="páginas, exercícios…"
          />
        </label>
      </div>
      <p className="em-help">
        {RULES.xp} XP e {RULES.gold} ouro ao atingir a meta, apenas uma vez. A meta fica fixa
        depois da primeira premiação.
      </p>
    </>
  );
}

export function RewardFields({ item }: { item?: Reward }) {
  return (
    <>
      <label>
        Nome da recompensa
        <input
          name="name"
          required
          maxLength={80}
          defaultValue={item?.name || ""}
          placeholder="Ex.: Uma hora de videogame"
          autoFocus
        />
      </label>
      <label>
        Preço em ouro
        <input
          type="number"
          name="price"
          min={1}
          max={1000000}
          step={1}
          required
          defaultValue={item?.price || 20}
        />
      </label>
      <p className="em-help">Você decide o preço. O valor sugerido é só um exemplo.</p>
    </>
  );
}
