export default function addGoogleTranslate() {
  const script = document.createElement('script');
  script.src =
    'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.type = 'text/javascript';
  script.async = true;
  script.defer = true;

  document.body.append(script);
}
