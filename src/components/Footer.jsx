import './Footer.css';
import logoCorporativo from "../assets/logoCorporativo.png";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">

        {/* Endereço */}
        <div className="footer-column">
          <p className="footer-text">
            R. André Ricardo Santos Caironi de Souza, 94 <br />
            São Paulo SP - Cerquilho <br /> <br />
          </p>

          <img src={logoCorporativo} alt="Logo" className="imagem" />
        </div>

        {/* Contato */}
        <div className="footer-column contato">
          <h3>Contato</h3>

          <p className="phone-number">
            +55 (15) 99795-2060
          </p>

          <a
            href="https://www.instagram.com/magazineluiza"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-link"
          >
            <FaInstagram />
            <span>@magazineluiza</span>
          </a>
        </div>

      </div>

      {/* Linha divisória */}
      <hr className="footer-divider" />

      {/* Copyright */}
      <div className="footer-bottom">
        <h3>Copyright © 2026 Magazine Luiza. Todos os direitos reservados.</h3>
      </div>
    </footer>
  );
}

export default Footer;