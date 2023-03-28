export default function validateFields(email, password, username) {
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const NUMBER_TWELVE = 12;
  if (typeof username === 'string' && username.length < NUMBER_TWELVE) {
    return 'Digite um nome com no mínimo 12 caracteres';
  }

  if (!regexEmail.test(email)) {
    return 'Digite um email válido';
  }

  const NUMBER_SIX = 6;
  if (password.length < NUMBER_SIX) {
    return 'Digite uma senha com no mínimo 6 caracteres';
  }

  return true;
}
