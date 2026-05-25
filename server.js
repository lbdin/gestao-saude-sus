const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    const rotas = {
        '/': '<h1>Gestão de Saúde SUS</h1><p>Objetivo: Digitalização e eficiência no atendimento público.</p><ul><li><a href="/quemsou">Quem Sou</a></li><li><a href="/ofertas">Ofertas</a></li><li><a href="/novos">Novos Equipamentos</a></li><li><a href="/seminovos">Auditoria de Unidades</a></li></ul>',
        
        '/quemsou': '<h1>Sobre o Aluno</h1><p>Meu nome é Luiza, eu sou estudante do terceiro semestre de DSM e desenvolvi este projeto de sistema de gestão hospitalar focado na transparência do SUS.</p><a href="/">Voltar</a>',

        '/ofertas': carregarPagina('ofertas.json', 'Serviços Disponíveis'),
        '/novos': carregarPagina('novos.json', 'Novos Equipamentos'),
        '/seminovos': carregarPagina('seminovos.json', 'Auditoria de Unidades')
    };

    const content = rotas[req.url] || '<h1>404 - Página Não Encontrada</h1><a href="/">Voltar</a>';
    res.end(content);
});

function carregarPagina(arquivo, titulo) {
    try {
        const dados = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', arquivo), 'utf-8'));
        let html = `<h1>${titulo}</h1><ul>`;
        dados.forEach(item => {
            html += `<li><strong>${item.nome || item.descricao}</strong>: ${item.detalhe || item.positivo || 'Sem detalhes'}</li>`;
        });
        return html + '</ul><a href="/">Voltar</a>';
        } catch (e) {
        return `<h1>Erro ao carregar dados</h1><p>${e.message}</p><a href="/">Voltar</a>`;
    }
}

server.listen(6200, () => {
   console.log('Servidor rodando em http://localhost:6200');
 });