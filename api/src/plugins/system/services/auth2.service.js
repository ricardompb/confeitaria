function gerarStringAleatoria(tamanho) {
  const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let resultado = '';
  for (let i = 0; i < tamanho; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
    resultado += caracteresPermitidos.charAt(indiceAleatorio);
  }
  return resultado;
}

const minhaStringAleatoria = gerarStringAleatoria(10); // Gere uma string aleatória de 10 caracteres
console.log(minhaStringAleatoria);


module.exports = {
  login: async (params, ctx) => {
    
    return { token: gerarStringAleatoria(32) }
  }
}