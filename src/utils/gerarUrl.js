const fse = require('fs-extra');
const path = require('path');
const { URL } = require('url');

const PUBLIC_ROOT_PATH = path.join(process.cwd(), 'public');
const API_URL = process.env.API_BASE_URL || 'http://localhost:3333';

function gerarUrl(nomeArquivo, pasta, ...arquivosPadrao) {
    const arquivosPadraoList = Array.isArray(arquivosPadrao[0]) 
        ? arquivosPadrao[0] 
        : arquivosPadrao;
    
    const arquivosValidos = arquivosPadraoList.length > 0 
        ? arquivosPadraoList 
        : ['default.jpg'];

    let caminhoRelativo;
    
    if (nomeArquivo) {
        const caminhoFisico = path.join(PUBLIC_ROOT_PATH, pasta, nomeArquivo);
        if (fse.existsSync(caminhoFisico)) {
            caminhoRelativo = path.join('/public', pasta, nomeArquivo);
        } else {
            const arquivoPadrao = arquivosValidos[Math.floor(Math.random() * arquivosValidos.length)];
            caminhoRelativo = path.join('/public', pasta, arquivoPadrao);
        }
    } else {
        const arquivoPadrao = arquivosValidos[Math.floor(Math.random() * arquivosValidos.length)];
        caminhoRelativo = path.join('/public', pasta, arquivoPadrao);
    }

    const caminhoRelativoFormatado = caminhoRelativo.replace(/\\/g, '/');
    const urlCompleta = new URL(caminhoRelativoFormatado, API_URL);

    return urlCompleta.href;
}

module.exports = { gerarUrl };