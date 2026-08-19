/* ---------------------------------------------------------------------------
   Envio dos formulários sem sair da página.
   Serviço: Web3Forms (https://web3forms.com) — gratuito, sem criar conta.

   >>> PARA ATIVAR: peça a chave em web3forms.com informando
       ptgsouza+checkuppessoal@gmail.com e cole abaixo, no lugar de COLE_SUA_CHAVE_AQUI.
       Enquanto a chave não for preenchida, os formulários caem automaticamente
       no envio por e-mail, sem quebrar nada.
--------------------------------------------------------------------------- */
var CP_CHAVE_FORM = '68c1f424-c10e-4197-8572-d1610a6f2fd7';
var CP_EMAIL = 'ptgsouza+checkuppessoal@gmail.com';

(function () {
  var formularios = document.querySelectorAll('[data-cp-form]');

  function mostrar(caixa, tipo, html) {
    caixa.className = 'aviso-form ' + tipo;
    caixa.innerHTML = html;
  }

  function montarMailto(form, assunto) {
    var linhas = [];
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || el.name === 'botcheck' || el.type === 'submit') return;
      if (el.type === 'checkbox' && !el.checked) return;
      linhas.push(el.name + ': ' + (el.type === 'checkbox' ? 'Sim' : el.value));
    });
    return 'mailto:' + CP_EMAIL.replace('+', '%2B') +
           '?subject=' + encodeURIComponent(assunto) +
           '&body=' + encodeURIComponent(linhas.join('\n'));
  }

  Array.prototype.forEach.call(formularios, function (form) {
    var caixa = form.querySelector('.aviso-form');
    var botao = form.querySelector('button[type=submit]');
    var assunto = form.getAttribute('data-assunto');
    var rotuloBotao = botao.textContent;

    form.addEventListener('submit', function (evento) {
      evento.preventDefault();
      if (!form.reportValidity()) return;

      /* Sem chave configurada: usa o e-mail como alternativa. */
      if (CP_CHAVE_FORM === 'COLE_SUA_CHAVE_AQUI') {
        window.location.href = montarMailto(form, assunto);
        mostrar(caixa, 'ok', 'Abrimos seu programa de e-mail com a mensagem pronta. ' +
                'Se nada acontecer, escreva para <a href="mailto:' + CP_EMAIL.replace('+', '%2B') + '">' + CP_EMAIL + '</a>.');
        return;
      }

      var dados = new FormData(form);
      dados.append('access_key', CP_CHAVE_FORM);
      dados.append('subject', assunto);
      dados.append('from_name', 'Site CheckupPessoal');

      botao.disabled = true;
      botao.textContent = 'Enviando…';
      mostrar(caixa, '', '');

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: dados
      })
        .then(function (r) { return r.json(); })
        .then(function (r) {
          if (r.success) {
            form.reset();
            mostrar(caixa, 'ok', 'Recebido, obrigado! Toda mensagem é lida. Se precisarmos de mais detalhes, respondemos no e-mail que você informou.');
          } else {
            throw new Error(r.message || 'falha no envio');
          }
        })
        .catch(function () {
          mostrar(caixa, 'erro', 'Não foi possível enviar agora. ' +
            '<a href="' + montarMailto(form, assunto) + '">Clique aqui para enviar por e-mail</a> ' +
            'ou escreva para ' + CP_EMAIL + '.');
        })
        .then(function () {
          botao.disabled = false;
          botao.textContent = rotuloBotao;
        });
    });
  });
})();
