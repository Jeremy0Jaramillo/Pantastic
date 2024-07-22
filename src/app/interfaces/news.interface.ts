export default interface News {
  id: string;
  title: string;
  content: string;
  clubId?: string; // Club al que pertenece la noticia (opcional para noticias generales)
  img?: string; // Imagen opcional para la noticia
}
