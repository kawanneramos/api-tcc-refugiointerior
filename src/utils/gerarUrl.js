const fse = require('fs-extra');
const path = require('path');
const { URL } = require('url'); // Módulo nativo do Node.js para trabalhar com URLs

/**
 * Caminho físico para a pasta 'public'.
 */
const PUBLIC_ROOT_PATH = path.join(process.cwd(), 'public');

/**
 * Lê a URL base da API a partir das variáveis de ambiente.
 * Fornece um valor padrão caso a variável não esteja definida.
 */
const API_URL = process.env.API_BASE_URL || 'http://localhost:3333';

/**
 * Gera uma URL pública e COMPLETA para um recurso (imagem, ícone, etc.).
 *
 * @returns {string} A URL completa e formatada
 */function gerarUrl(nomeArquivo, pasta, arquivosPadrao) {
    let arquivosValidos;
    
    if (Array.isArray(arquivosPadrao)) {
        arquivosValidos = arquivosPadrao;
    } else {
        arquivosValidos = [arquivosPadrao];
    }
    
    const caminhoFisico = path.join(PUBLIC_ROOT_PATH, pasta, nomeArquivo);
    let caminhoRelativo;

    if (nomeArquivo && fse.existsSync(caminhoFisico)) {
        caminhoRelativo = path.join('/public', pasta, nomeArquivo);
    } else {
        // Seleciona um arquivo padrão aleatório do array
        const arquivoPadrao = arquivosValidos[Math.floor(Math.random() * arquivosValidos.length)];
        caminhoRelativo = path.join('/public', pasta, arquivoPadrao);
    }

    const caminhoRelativoFormatado = caminhoRelativo.replace(/\\/g, '/');
    const urlCompleta = new URL(caminhoRelativoFormatado, API_URL);

    return urlCompleta.href;
}
// Exporte a nova função
module.exports = { gerarUrl };