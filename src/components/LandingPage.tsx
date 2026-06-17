import { CheckoutButton } from "@/components/CheckoutButton";
import { siteConfig } from "@/config/site";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const whatsappTransferUrl = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Hola, quiero inscribirme a Aprender a Amar por transferencia. ¿Me pasas los datos?",
    )}`
  : "#";

const temario = [
  {
    num: "01",
    title: "El diagnóstico",
    meta: "Sesión 1 · 2 horas",
    items: [
      {
        strong: "La trampa del amor moderno.",
        text: "Por qué aprendimos a querer ser deseados en lugar de saber amar.",
      },
      {
        strong: "La separatidad.",
        text: "Esa sensación de estar solos —incluso acompañados— y de dónde nace.",
      },
      {
        strong: "Las falsas soluciones.",
        text: "Placer, éxito, pertenencia: todo lo que usamos para no sentir el vacío.",
      },
    ],
  },
  {
    num: "02",
    title: "Lo que confundimos con amor",
    meta: "Sesión 2 · 2 horas",
    items: [
      {
        strong: "El enamoramiento y la unión simbiótica.",
        text: "La diferencia entre perderte en alguien y unirte de verdad.",
      },
      {
        strong: "Todo lo que no es amor.",
        text: "Dependencia, posesión, control, idealización: los disfraces del amor.",
      },
      {
        strong: "Amor inmaduro vs. amor maduro.",
        text: "De «te amo porque te necesito» a «te necesito porque te amo».",
      },
    ],
  },
  {
    num: "03",
    title: "El amor como arte",
    meta: "Sesión 3 · 2 horas",
    items: [
      {
        strong: "El amor como arte: los cuatro pilares.",
        text: "Disciplina, concentración, paciencia y cuidado genuino por el otro.",
      },
      {
        strong: "Los objetos del amor.",
        text: "Las formas del amor: fraternal, materno, erótico, propio y a lo trascendente.",
      },
    ],
  },
  {
    num: "04",
    title: "El coraje de amar",
    meta: "Sesión 4 · 2 horas",
    items: [
      {
        strong: "El sistema que lo imposibilita.",
        text: "Cómo el consumo y el individualismo nos dificultan la capacidad de amar.",
      },
      {
        strong: "La práctica y el coraje de amar.",
        text: "Amar como decisión diaria: fe, valentía y entregarse sin garantías.",
      },
    ],
  },
];

const includes = [
  {
    bold: "4 sesiones en vivo de 2 horas",
    rest: "— análisis, ejemplos y conversación abierta.",
  },
  {
    bold: "El arte de amar de Erich Fromm",
    rest: "— traducido, idea por idea, a tu vida real.",
  },
  {
    bold: "Cultura pop como lente",
    rest: "— cine, música, literatura y mito para ver lo invisible.",
  },
  {
    bold: "Espacio para preguntar",
    rest: "— dudar, pensar en voz alta y mirarte de frente.",
  },
  {
    bold: "Todo por $400 pesos",
    rest: "— un precio para que nada te lo impida.",
  },
];

const popTags = [
  "Cine de animación",
  "Sagas que amamos",
  "Una canción",
  "Un libro prohibido",
  "Un mito fundacional",
];

export function LandingPage() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-amp" aria-hidden="true">
          &amp;
        </div>
        <div className="container hero-inner">
          <header className="hero-header">
            <span className="brand">Aprender a Amar</span>
            <span className="badge">Curso en vivo</span>
          </header>

          <p className="hero-kicker">
            Basado en{" "}
            <em className="hero-kicker-em">El arte de amar</em> de Erich Fromm
          </p>

          <h1 className="hero-title">
            Nadie nos enseñó
            <br />
            <span className="hero-title-accent">a amar.</span>
          </h1>

          <div className="hero-cta">
            <a href="#pago" className="btn btn-cream">
              Quiero inscribirme
            </a>
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container narrow">
          <span className="eyebrow">El problema</span>
          <p className="lead">
            Llevas años creyendo que el amor es algo que{" "}
            <em className="text-accent">te pasa</em> —o que no te pasa lo
            suficiente.
          </p>
          <p className="body">
            Que basta con encontrar a la persona correcta. Que si duele, es
            porque es real. Y entre relación y relación, la misma sensación:
            estás solo, hasta acompañado. Confundes la necesidad con el cariño,
            el control con el cuidado, las ganas de que no te dejen con las
            ganas de querer. La buena noticia: amar no es suerte. Es una
            habilidad. Y como toda habilidad, se aprende.
          </p>
        </div>
      </section>

      <section className="section section-dark center">
        <div className="container narrow">
          <span className="eyebrow eyebrow-coral">Cómo lo vemos</span>
          <p className="lead lead-light">
            Cada idea de Fromm la vamos a ver a través de una película, una
            canción, un libro, un mito que{" "}
            <em className="text-soft">ya conoces.</em>
          </p>
          <p className="body body-light">
            No te decimos cuáles. Esa es la mitad de la magia: descubrir que la
            teoría más profunda sobre el amor estaba escondida en las historias
            que viste sin darte cuenta.
          </p>
          <div className="tags">
            {popTags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="temario" className="section section-cream">
        <div className="container">
          <div className="temario-header">
            <div>
              <span className="eyebrow">El temario</span>
              <h2 className="section-title">
                Diez ideas,
                <br />
                <span className="text-accent">cuatro sesiones.</span>
              </h2>
            </div>
            <p className="temario-aside">
              Cada sesión dura <strong>2 horas</strong> en vivo: análisis,
              ejemplos de cultura pop y conversación. Las cuatro juntas son el
              recorrido completo del libro de Fromm —llevado a tu vida real.
            </p>
          </div>

          <div className="temario-list">
            {temario.map((session) => (
              <article key={session.num} className="card">
                <div className="card-head">
                  <span className="card-num">{session.num}</span>
                  <div>
                    <h3 className="card-title">{session.title}</h3>
                    <span className="card-meta">{session.meta}</span>
                  </div>
                </div>
                <div className="card-items">
                  {session.items.map((item, i) => (
                    <div
                      key={item.strong}
                      className={`card-item${i === 0 ? " card-item-first" : ""}`}
                    >
                      <span className="dot" />
                      <p>
                        <strong>{item.strong}</strong>{" "}
                        <span className="muted">{item.text}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-red">
        <div className="container">
          <span className="eyebrow eyebrow-soft">Lo que incluye</span>
          <div className="includes-list">
            {includes.map((item, i) => (
              <div key={item.bold} className="includes-row">
                <span className="includes-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p>
                  <strong>{item.bold}</strong> {item.rest}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container about">
          <div className="about-photo" aria-label="Foto de Ainhoa Govea">
            <span className="about-photo-letter" aria-hidden="true">
              A
            </span>
            <span className="about-photo-label">Foto de Ainhoa</span>
          </div>
          <div className="about-content">
            <span className="eyebrow">Quién te acompaña</span>
            <h2 className="section-title section-title-sm">
              {siteConfig.instructor}
            </h2>
            <p className="body">
              Psicóloga, apasionada por sacar las ideas más profundas de la
              disciplina fuera del aula. Las cuenta a través del cine, la
              literatura y los conflictos humanos de quienes las crearon.
            </p>
            <p className="body">
              Para ella, Fromm no es un autor difícil: es alguien que entendió
              algo que nadie nos dijo. Su trabajo es traducirlo para que también
              lo entiendas tú.
            </p>
          </div>
        </div>
      </section>

      <section id="pago" className="section section-dark center">
        <div className="container payment">
          <span className="eyebrow eyebrow-coral">Tu lugar en el curso</span>
          <h2 className="price">
            ${siteConfig.price}{" "}
            <span className="price-unit">pesos</span>
          </h2>
          <p className="body body-light payment-sub">
            Las 4 sesiones completas. Elige cómo prefieres apartar tu lugar:
          </p>

          <div className="payment-grid">
            <div className="payment-card payment-card-light">
              <span className="payment-option">Opción A · Tarjeta</span>
              <h3 className="payment-title">Pago con tarjeta</h3>
              <p className="body">
                Inscríbete al instante con débito o crédito. Recibes la
                confirmación en tu correo y WhatsApp.
              </p>
              <CheckoutButton />
            </div>

            <div className="payment-card payment-card-outline">
              <span className="payment-option payment-option-coral">
                Opción B · Transferencia
              </span>
              <h3 className="payment-title payment-title-light">
                Pago por transferencia
              </h3>
              <p className="body body-light">
                Escríbenos por WhatsApp y te pasamos los datos. Apartas tu
                lugar en un mensaje.
              </p>
              <a
                href={whatsappTransferUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <span className="footer-brand">Aprender a Amar</span>
          <span className="footer-meta">
            Un curso de {siteConfig.instructor} · Basado en Erich Fromm
          </span>
        </div>
      </footer>
    </div>
  );
}
