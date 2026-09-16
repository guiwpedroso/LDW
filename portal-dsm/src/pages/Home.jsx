function Home() {
    return (
      <main className="home">
  
        {/* HERO */}
        <section className="home-hero">
  
          <div className="hero-content">
            <span className="hero-tag">
              🚀 PORTAL ACADÊMICO
            </span>
  
            <h1>
              Portal <span>DSM</span>
            </h1>
  
            <p>
              Bem-vindo ao portal do curso de
              <strong> Desenvolvimento de Sistemas.</strong>
            </p>
  
            <div className="hero-buttons">
              <a href="/alunos" className="hero-button primary">
                👨‍💻 Área dos Alunos
              </a>
  
              <a href="/cursos" className="hero-button secondary">
                📚 Ver Cursos
              </a>
            </div>
          </div>
  
          {/* ELEMENTO FUTURISTA */}
          <div className="hero-visual">
            <div className="orbit orbit-1"></div>
            <div className="orbit orbit-2"></div>
            <div className="orbit orbit-3"></div>
  
            <div className="code-circle">
              &lt;/&gt;
            </div>
          </div>
  
        </section>
  
  
        {/* ESTATÍSTICAS */}
        <section className="home-stats">
  
          <div className="stat">
            <span>💻</span>
            <strong>DSM</strong>
            <p>Desenvolvimento de Sistemas</p>
          </div>
  
          <div className="stat">
            <span>📚</span>
            <strong>4º</strong>
            <p>Semestre</p>
          </div>
  
          <div className="stat">
            <span>🚀</span>
            <strong>∞</strong>
            <p>Possibilidades</p>
          </div>
  
        </section>
  
  
        {/* SOBRE */}
        <section className="home-section">
  
          <div className="section-title">
            <span>CONHEÇA O PORTAL</span>
            <h2>Tecnologia que conecta</h2>
          </div>
  
          <div className="home-cards">
  
            <article className="home-card">
              <div className="home-card-icon">
                💻
              </div>
  
              <h3>Programação</h3>
  
              <p>
                Aprenda lógica, desenvolvimento de software
                e as principais tecnologias utilizadas no mercado.
              </p>
            </article>
  
  
            <article className="home-card">
              <div className="home-card-icon">
                🌐
              </div>
  
              <h3>Desenvolvimento Web</h3>
  
              <p>
                Crie aplicações modernas, responsivas e
                preparadas para os desafios da tecnologia.
              </p>
            </article>
  
  
            <article className="home-card">
              <div className="home-card-icon">
                🗄️
              </div>
  
              <h3>Banco de Dados</h3>
  
              <p>
                Organize informações, desenvolva estruturas
                eficientes e trabalhe com dados.
              </p>
            </article>
  
          </div>
  
        </section>
  
  
        {/* FRASE FINAL */}
        <section className="home-cta">
  
          <div>
            <span>⚡ DESENVOLVIMENTO DE SISTEMAS</span>
  
            <h2>
              O futuro começa
              <br />
              com uma linha de código.
            </h2>
  
            <p>
              Explore o Portal DSM e descubra tudo
              que o curso tem para oferecer.
            </p>
          </div>
  
          <div className="cta-decoration">
            {"{ }"}
          </div>
  
        </section>
  
      </main>
    );
  }
  
  export default Home;
  