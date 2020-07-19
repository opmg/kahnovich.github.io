!function(exports) {
  exports.submitGoogleForm = submitGoogleForm;

  function submitGoogleForm(form) {
    try {
      var data = [].slice.call(form).map(function(control) {
        return 'value' in control && control.name ?
          control.name + '=' + (control.value === undefined ? '' : translit(control.value)) :
          '';
      }).join('&');
      var xhr = new XMLHttpRequest();

      xhr.open('POST', form.action + '/formResponse', true);
      xhr.setRequestHeader('Accept',
          'application/xml, text/xml, */*; q=0.01');
      xhr.setRequestHeader('Content-type',
          'application/x-www-form-urlencoded; charset=UTF-8');
      xhr.send(data);
    } catch(e) {}

    form.parentNode.className += ' submitted';
    alert("Форма отправлена!");
    $('form')[0].reset();
    return false;
  }
}(typeof module === 'undefined' ? window : module.exports);

function translit(str) {
    var space = ' ';
    var link = '';
    var transl = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
        'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
        'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh','ъ': space,
        'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya'
    }
if (str != '')
    str = str.toLowerCase();
 
for (var i = 0; i < str.length; i++){
    if (/[а-яё]/.test(str.charAt(i))){ // заменяем символы на русском
        link += transl[str.charAt(i)];
    } else if (/[a-z0-9]/.test(str.charAt(i))){ // символы на анг. оставляем как есть
        link += str.charAt(i);
    } else {
        if (link.slice(-1) !== space) link += str.charAt(i); // прочие символы заменяем на space
    }
}
    return link;
}