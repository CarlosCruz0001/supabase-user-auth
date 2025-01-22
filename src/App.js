import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient"; // Importando o cliente do Supabase





const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [roleId, setRoleId] = useState(2); // Padrão para 'user' (ID = 2)
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Carregar as roles do banco de dados
  useEffect(() => {
    const fetchRoles = async () => {
      const { data, error } = await supabase.from("roles").select("*");

      if (error) {
        console.error("Erro ao buscar roles:", error);
        setError("Não foi possível carregar os papéis.");
        return;
      }

      console.log("Roles carregados:", data); // Verifique se os roles estão sendo carregados corretamente.
      setRoles(data);
    };
    fetchRoles();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Verificar se todos os campos estão preenchidos
    if (!email || !password || !fullName) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    // Criar o usuário no Supabase Auth
    const { user, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    // Se houve um erro na criação do usuário, não prosseguir
    if (authError) {
      setError(authError.message);
      return;
    }

    // Verifique se o `user` foi realmente criado
    if (!user) {
      setError("Erro desconhecido ao criar o usuário");
      return;
    }

    // Inserir dados do usuário na tabela 'users'
    const { data, error: insertError } = await supabase.from("users").insert([
      {
        id: user.id, // Usando o UUID do Supabase Auth
        role_id: roleId, // Relacionando o papel
        full_name: fullName,
        email,
      },
    ]);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    // Sucesso no cadastro
    setSuccess(true);
    setError(null);

    // Limpar os campos do formulário
    setEmail("");
    setPassword("");
    setFullName("");
    setRoleId(2); // Resetando para o valor padrão
  };

  return (
    <div>
      <h2>Criar Conta</h2>
      {success && (
        <p style={{ color: "green" }}>Usuário cadastrado com sucesso!</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="full_name">Nome Completo:</label>
          <input
            type="text"
            id="full_name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="role">Papel:</label>
          <select
            id="role"
            value={roleId}
            onChange={(e) => setRoleId(parseInt(e.target.value))}
          >
            {roles.length > 0 ? (
              roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Carregando papéis...
              </option>
            )}
          </select>
        </div>

        <button type="submit">Criar Conta</button>
      </form>
    </div>
  );
};

export default Register;
