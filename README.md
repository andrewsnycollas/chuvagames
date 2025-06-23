# 🎮 CHUVA Games CO - Website Oficial

> **"Somos um coletivo de neurodivergentes amantes de jogos que se reuniram para contar histórias"**

Site oficial do estúdio brasileiro de jogos independentes CHUVA Games CO, desenvolvido com foco em acessibilidade, responsividade e experiência do usuário.

## 📋 Índice

- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Sistema de Cards da Equipe](#-sistema-de-cards-da-equipe)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Configuração e Instalação](#-configuração-e-instalação)
- [Manutenção](#-manutenção)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## 🏗️ Estrutura do Projeto

```
chuvagames/
├── 📁 assets/                    # Recursos estáticos
│   ├── 📁 css/
│   │   └── styles.css            # Estilos principais
│   ├── 📁 images/               # Imagens do site
│   │   ├── 📁 background/       # Imagens de fundo
│   │   ├── 📁 banners/          # Banners promocionais
│   │   ├── 📁 games/            # Screenshots dos jogos
│   │   ├── 📁 icons/            # Ícones e favicons
│   │   ├── 📁 logos/            # Logotipos
│   │   └── 📁 team/             # Fotos da equipe
│   └── 📁 scripts/              # Scripts JavaScript
│       ├── scripts.js           # Script principal
│       └── team-en.js           # Script específico da equipe (EN)
├── 📁 eng/                      # Versão em inglês
│   ├── index.html
│   ├── team.html
│   ├── games.html
│   ├── contact.html
│   └── [páginas dos jogos].html
├── 📁 pt-br/                    # Versão em português
│   ├── index.html
│   ├── team.html
│   ├── games.html
│   ├── contact.html
│   └── [páginas dos jogos].html
├── 📁 Kuadrika/                 # Jogo embarcado Kuadrika
├── 📁 orbit/                    # Jogo embarcado Orbit
├── index.html                   # Página de seleção de idioma
├── robots.txt                   # Configurações para crawlers
├── sitemap.xml                  # Mapa do site
├── CNAME                        # Configuração de domínio
└── README.md                    # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização avançada com variáveis CSS
- **JavaScript (ES6+)** - Interatividade e funcionalidades dinâmicas
- **Bootstrap 5.3.3** - Framework CSS para responsividade
- **Font Awesome** - Biblioteca de ícones
- **Google Fonts** - Tipografia (Open Sans)

### Hospedagem
- **GitHub Pages** - Hospedagem estática
- **Domínio personalizado** - chuvagames.co

### SEO e Performance
- **Meta tags otimizadas** - Open Graph, Twitter Cards
- **Sitemap XML** - Indexação pelos motores de busca
- **Robots.txt** - Controle de crawling
- **Lazy loading** - Carregamento otimizado de imagens

## ⭐ Funcionalidades Principais

### 🌐 Multilíngue
- **Português (pt-br)** - Versão principal
- **Inglês (eng)** - Versão internacional
- Seletor de idioma na página inicial

### 📱 Design Responsivo
- Layout adaptável para desktop, tablet e mobile
- Navegação otimizada para dispositivos móveis
- Imagens responsivas com lazy loading

### 🎨 Interface Interativa
- **Navbar dinâmica** - Oculta/exibe no scroll
- **Dropdowns animados** - Menus de navegação
- **Hover effects** - Interações visuais
- **Modais responsivos** - Para equipe e jogos

### 🎮 Jogos Embarcados
- **Kuadrika** - Jogo de quebra-cabeça
- **Orbit** - Jogo de ação
- Integração direta no site

## 👥 Sistema de Cards da Equipe

### Estrutura de Dados

O sistema de cards da equipe é gerenciado através de arrays JavaScript que contêm informações detalhadas de cada membro:

```javascript
const teamMembersEn = [
  {
    name: "Nome do Membro",
    role: "Cargo/Função",
    thumb: "/assets/images/team/foto.png",
    gif: "/assets/images/team/foto.gif",
    desc: "Descrição detalhada...",
    skills: [
      { name: "Habilidade", value: 100 }
    ],
    social: [
      { 
        href: "URL", 
        icon: "icone_padrao.png", 
        hover: "icone_hover.png", 
        alt: "Plataforma" 
      }
    ]
  }
];
```

### Funcionalidades dos Cards

#### 🖼️ Imagens Dinâmicas
- **Thumbnail estática** - Imagem padrão do membro
- **GIF animado** - Ativado no hover
- **Transições suaves** - Entre estados

#### 📊 Sistema de Skills
- **Barras de progresso** - Representação visual das habilidades
- **Valores percentuais** - De 0 a 100 (ou mais para casos especiais)
- **Animações** - Preenchimento progressivo das barras

#### 🔗 Redes Sociais
- **Ícones interativos** - Estado normal e hover
- **Links externos** - Abertura em nova aba
- **Múltiplas plataformas** - LinkedIn, Instagram, Discord, etc.

### Modal da Equipe

#### Estrutura HTML
```html
<div class="team-modal-bg" id="teamModalBgEn">
  <div class="team-modal" id="teamModalEn">
    <button class="modal-close" aria-label="Close">&times;</button>
    <img class="team-modal-img" id="teamModalImgEn">
    <div class="team-modal-title" id="teamModalTitleEn"></div>
    <div class="team-modal-role" id="teamModalRoleEn"></div>
    <div class="team-modal-desc" id="teamModalDescEn"></div>
    <div class="team-modal-skills" id="teamModalSkillsEn"></div>
    <div class="team-modal-social" id="teamModalSocialEn"></div>
  </div>
</div>
```

#### Funcionalidades JavaScript

1. **Renderização dos Cards**
   ```javascript
   function initTeamCards() {
     // Embaralha a ordem dos membros
     window._shuffledTeamEn = shuffleArray(teamMembersEn);
     
     // Gera HTML dos cards dinamicamente
     grid.innerHTML = window._shuffledTeamEn.map((member, idx) => {
       // Template do card
     }).join('');
   }
   ```

2. **Sistema de Modal**
   ```javascript
   function initTeamModal() {
     // Event listeners para abrir/fechar modal
     // Preenchimento dinâmico do conteúdo
     // Controle de scroll e acessibilidade
   }
   ```

3. **Hover Effects**
   ```javascript
   // Troca de imagem no hover
   img.addEventListener('mouseenter', () => {
     img.src = member.gif;
   });
   
   img.addEventListener('mouseleave', () => {
     img.src = member.thumb;
   });
   ```

### Adicionando Novos Membros

1. **Adicionar fotos**:
   - Thumbnail: `/assets/images/team/nome.png`
   - GIF: `/assets/images/team/nome.gif`

2. **Atualizar arrays**:
   - `teamMembersEn` (inglês) em `scripts.js`
   - `teamMembersPt` (português) em `scripts.js`
   - `teamMembersEn` em `team-en.js` (se aplicável)

3. **Estrutura do objeto**:
   ```javascript
   {
     name: "Nome Completo",
     role: "Cargo/Função",
     thumb: "/assets/images/team/arquivo.png",
     gif: "/assets/images/team/arquivo.gif",
     desc: "Biografia detalhada...",
     skills: [
       { name: "Habilidade 1", value: 90 },
       { name: "Habilidade 2", value: 75 }
     ],
     social: [
       {
         href: "https://linkedin.com/in/perfil",
         icon: "default_linkedin.png",
         hover: "hover_linkedin.png",
         alt: "LinkedIn"
       }
     ]
   }
   ```

## 🔧 Configuração e Instalação

### Pré-requisitos
- Navegador web moderno
- Servidor web local (para desenvolvimento)
- Editor de código (recomendado: VS Code)

### Instalação Local

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/chuvagames/website.git
   cd website/chuvagames
   ```

2. **Servidor local**:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (com live-server)
   npx live-server
   
   # PHP
   php -S localhost:8000
   ```

3. **Acesse**: `http://localhost:8000`

### Deploy

O site é automaticamente deployado via GitHub Pages quando há push na branch principal.

## 🔨 Manutenção

### Atualizando Conteúdo

#### Membros da Equipe
1. Edite os arrays em `/assets/scripts/scripts.js`
2. Adicione imagens em `/assets/images/team/`
3. Teste localmente
4. Commit e push

#### Jogos
1. Adicione imagens em `/assets/images/games/`
2. Atualize páginas HTML correspondentes
3. Modifique dados dos jogos nos scripts

#### Estilos
1. Edite `/assets/css/styles.css`
2. Use variáveis CSS para consistência:
   ```css
   :root {
     --primary-color: #f27961;
     --primary-hover: #d0454f;
     --bg-transparent: #1d1d1db0;
   }
   ```

### Otimização de Performance

1. **Imagens**:
   - Comprima imagens antes do upload
   - Use formatos modernos (WebP quando possível)
   - Mantenha thumbnails pequenos (< 100KB)

2. **CSS/JS**:
   - Minifique arquivos para produção
   - Remova código não utilizado
   - Use lazy loading para imagens

### SEO

1. **Meta tags**: Atualize em cada página HTML
2. **Sitemap**: Regenere após adicionar páginas
3. **Alt texts**: Sempre inclua em imagens
4. **Estrutura semântica**: Use tags HTML apropriadas

## 🤝 Contribuição

### Diretrizes

1. **Fork** o repositório
2. **Crie uma branch** para sua feature: `git checkout -b feature/nova-funcionalidade`
3. **Commit** suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. **Push** para a branch: `git push origin feature/nova-funcionalidade`
5. **Abra um Pull Request**

### Padrões de Código

- **HTML**: Indentação de 2 espaços, tags em minúsculas
- **CSS**: BEM methodology, variáveis CSS
- **JavaScript**: ES6+, camelCase, comentários JSDoc

### Testes

- Teste em múltiplos navegadores
- Verifique responsividade
- Valide HTML/CSS
- Teste acessibilidade

## 📄 Licença

Este projeto está licenciado sob termos específicos - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

### Resumo da Licença

- ✅ **Permitido**: Uso para estudo e aprendizado
- ❌ **Proibido**: Uso comercial ou cópias para fins comerciais
- 🏢 **Exclusivo**: Este projeto é propriedade exclusiva da CHUVA Games CO

---

## 📞 Contato

- **Website**: [chuvagames.co](https://chuvagames.co)
- **Discord**: [Servidor Oficial](https://discord.gg/Py6nAHGcDX)
- **YouTube**: [@ChuvaGames](https://www.youtube.com/@ChuvaGames)
- **Instagram**: [@chuvagames](https://www.instagram.com/chuvagames/)

---

<div align="center">
  <img src="/assets/images/logos/chuvamain.png" alt="CHUVA Games Logo" width="200">
  
  **Desenvolvido com ❤️ pela equipe CHUVA Games**
  
  *"Contando histórias através de jogos"*
</div>