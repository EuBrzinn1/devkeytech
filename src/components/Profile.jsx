import "./Profile.css";

export default function Profile({ user, setUser }) {

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="profile-wrapper">

      <div className="profile-card">

        <div className="profile-avatar-section">

          <div className="avatar-container">

            <img
              src={`https://unavatar.io/github/${user?.name || "usuario"}`}
              alt="Avatar"
              onError={(e) => {
                e.target.src =
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png";
              }}
            />

          </div>

          <h3>{user?.name}</h3>

        </div>


        <div className="profile-fields">

          <div className="input-box">

            <label>Nome Completo</label>

            <input
              type="text"
              name="name"
              value={user?.name || ""}
              onChange={handleChange}
            />

          </div>


          <div className="input-box">

            <label>Nível de Fidelidade</label>

            <select
              className="fidelidade-select"
              name="fidelidade"
              value={user?.fidelidade || "Bronze"}
              onChange={handleChange}
            >
              <option value="Bronze">🥉 Bronze</option>
              <option value="Prata">🥈 Prata</option>
              <option value="Ouro">🥇 Ouro</option>
            </select>

          </div>


          <button className="btn-salvar-perfil">
            Salvar Alterações
          </button>

        </div>

      </div>

    </div>
  );
}