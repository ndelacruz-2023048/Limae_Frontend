import { useMemo } from "react";

export const useNoticeDetails = (post) => {
  const defaultNotice = {
    pais: "RUSSIA",
    fecha: "3 OCT",
    titulo: "Moscow is among world's best Christmas markets",
    subtitulo: "The Telegraph named world’s 10 best Christmas markets – and Moscow was included on the list.",
    cuerpo: [
      "Rating's authors were impressed by glowing festive installations, aromatic mulled wine, gingerbread with crispy glaze and crêpes with caviar.",
      "Christmas markets 2018–2019 in Moscow are going to be held around GUM and the Red Square. There you can enjoy dishes of traditional Russian cuisine and Russian interpretations of famous European drinks and snacks."
    ],
    imagen: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    imageTitle: "Red Square",
    imageSubtitle: "Plaza in Moscow, Russia"
  };

  const processedNotice = useMemo(() => {
    if (!post) return defaultNotice;

    return {
      pais: post.pais || "GUATEMALA",
      fecha: post.fecha || "Sin fecha",
      titulo: post.titulo,
      subtitulo: post.subtitulo || post.entrada || post.descripcion || "Sin subtítulo",
      cuerpo: post.cuerpo || [post.entrada || post.descripcion || "Sin contenido"],
      imagen: post.imagen || post.fotografia,
      imageTitle: post.titulo,
      imageSubtitle: post.subtitulo || post.entrada || "Sin subtítulo"
    };
  }, [post]);

  return processedNotice;
};
