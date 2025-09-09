// script.js
class PokemonIdleLegendary {
  constructor() {
    this.state = {
      monedas: 100000,
      xp: 50000,
      medallas: 0,
      prestigio: 0,
      equipo: [],
      rolesActivos: { recaudador: null, cientifico: null, explorador: null, luchador: null },
      mejoras: { recaudador: 0, cientifico: 0, explorador: 0, luchador: 0 },
      objetos: [],
      huevos: [],
      pasos: 0,
      batallasGanadas: 0,
      pokemonCapturados: 0,
      shinyEncontrados: 0,
      misionesCompletadas: 0,
      capituloActual: 'kanto',
      misiones: {
        kanto: [
          { id: 'kanto1', nombre: "Primer Pokémon", desc: "Compra o captura tu primer Pokémon", completado: false, recompensa: 1000 },
          { id: 'kanto2', nombre: "Primer Evolución", desc: "Evoluciona un Pokémon", completado: false, recompensa: 2000 },
          { id: 'kanto3', nombre: "Equipo Completo", desc: "Activa un Pokémon en cada rol", completado: false, recompensa: 5000 },
          { id: 'kanto4', nombre: "Primera Batalla", desc: "Gana tu primera batalla", completado: false, recompensa: 3000 },
          { id: 'kanto5', nombre: "Campeón de Kanto", desc: "Completa todas las misiones", completado: false, recompensa: 10000 }
        ]
      },
      logros: {
        'primer_pokemon': { nombre: "¡Nuevo Entrenador!", desc: "Obtén tu primer Pokémon", completado: false, recompensa: 500 },
        '10_pokemon': { nombre: "Coleccionista Inicial", desc: "Obtén 10 Pokémon diferentes", completado: false, recompensa: 2000 },
        'shiny_primero': { nombre: "¡Brillante!", desc: "Encuentra tu primer Pokémon shiny", completado: false, recompensa: 5000 },
        'legendario': { nombre: "¡Mítico!", desc: "Obtén un Pokémon legendario", completado: false, recompensa: 10000 },
        'prestigio1': { nombre: "Renacimiento", desc: "Completa tu primer prestigio", completado: false, recompensa: 20000 }
      },
      mejorasPermanentes: [],
      notificaciones: [],
      musicaActivada: true
    };

    // ¡Caché PREGENERADO de 50 Pokémon con más detalle!
    this.pokemonCache = [
      { id: 1, nombre: "Bulbasaur", tipos: ["grass", "poison"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", region: "kanto", rol: "recaudador", precio: 100, baseGen: 1.0, evolucionaA: "ivysaur", xpEvol: 1000, stats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 } },
      { id: 2, nombre: "Ivysaur", tipos: ["grass", "poison"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png", region: "kanto", rol: "recaudador", precio: 500, baseGen: 3.0, evolucionaA: "venusaur", xpEvol: 2000, stats: { hp: 60, atk: 62, def: 63, spa: 80, spd: 80, spe: 60 } },
      { id: 3, nombre: "Venusaur", tipos: ["grass", "poison"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png", region: "kanto", rol: "recaudador", precio: 2500, baseGen: 8.0, evolucionaA: null, xpEvol: null, stats: { hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80 }, legendario: false },
      { id: 4, nombre: "Charmander", tipos: ["fire"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", region: "kanto", rol: "cientifico", precio: 100, baseGen: 1.0, evolucionaA: "charmeleon", xpEvol: 1000, stats: { hp: 39, atk: 52, def: 43, spa: 60, spd: 50, spe: 65 } },
      { id: 5, nombre: "Charmeleon", tipos: ["fire"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png", region: "kanto", rol: "cientifico", precio: 500, baseGen: 3.0, evolucionaA: "charizard", xpEvol: 2000, stats: { hp: 58, atk: 64, def: 58, spa: 80, spd: 65, spe: 80 } },
      { id: 6, nombre: "Charizard", tipos: ["fire", "flying"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png", region: "kanto", rol: "luchador", precio: 2500, baseGen: 8.0, evolucionaA: null, xpEvol: null, stats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 } },
      { id: 7, nombre: "Squirtle", tipos: ["water"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", region: "kanto", rol: "explorador", precio: 100, baseGen: 0.3, evolucionaA: "wartortle", xpEvol: 1000, stats: { hp: 44, atk: 48, def: 65, spa: 50, spd: 64, spe: 43 } },
      { id: 8, nombre: "Wartortle", tipos: ["water"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png", region: "kanto", rol: "explorador", precio: 500, baseGen: 0.5, evolucionaA: "blastoise", xpEvol: 2000, stats: { hp: 59, atk: 63, def: 80, spa: 65, spd: 80, spe: 58 } },
      { id: 9, nombre: "Blastoise", tipos: ["water"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png", region: "kanto", rol: "luchador", precio: 2500, baseGen: 0.8, evolucionaA: null, xpEvol: null, stats: { hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78 } },
      { id: 25, nombre: "Pikachu", tipos: ["electric"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png", region: "kanto", rol: "recaudador", precio: 500, baseGen: 5.0, evolucionaA: "raichu", xpEvol: 3000, stats: { hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90 }, shiny: true },
      { id: 133, nombre: "Eevee", tipos: ["normal"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png", region: "kanto", rol: "cientifico", precio: 1000, baseGen: 3.0, evolucionaA: "vaporeon", xpEvol: 4000, stats: { hp: 55, atk: 55, def: 50, spa: 45, spd: 65, spe: 55 } },
      { id: 150, nombre: "Mewtwo", tipos: ["psychic"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png", region: "kanto", rol: "luchador", precio: 50000, baseGen: 20.0, evolucionaA: null, xpEvol: null, stats: { hp: 106, atk: 110, def: 90, spa: 154, spd: 90, spe: 130 }, legendario: true },
      { id: 151, nombre: "Mew", tipos: ["psychic"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png", region: "kanto", rol: "cientifico", precio: 100000, baseGen: 25.0, evolucionaA: null, xpEvol: null, stats: { hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100 }, legendario: true, shiny: true },
      { id: 257, nombre: "Blaziken", tipos: ["fire", "fighting"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/257.png", region: "hoenn", rol: "luchador", precio: 3000, baseGen: 12.0, evolucionaA: null, xpEvol: null, stats: { hp: 80, atk: 120, def: 70, spa: 110, spd: 70, spe: 80 } },
      { id: 384, nombre: "Rayquaza", tipos: ["dragon", "flying"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png", region: "hoenn", rol: "luchador", precio: 75000, baseGen: 30.0, evolucionaA: null, xpEvol: null, stats: { hp: 105, atk: 150, def: 90, spa: 150, spd: 90, spe: 95 }, legendario: true },
      { id: 493, nombre: "Arceus", tipos: ["normal"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png", region: "sinnoh", rol: "todos", precio: 500000, baseGen: 50.0, evolucionaA: null, xpEvol: null, stats: { hp: 120, atk: 120, def: 120, spa: 120, spd: 120, spe: 120 }, legendario: true },
      { id: 658, nombre: "Greninja", tipos: ["water", "dark"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/658.png", region: "kalos", rol: "explorador", precio: 5000, baseGen: 1.2, evolucionaA: null, xpEvol: null, stats: { hp: 72, atk: 95, def: 67, spa: 103, spd: 71, spe: 122 } },
      { id: 719, nombre: "Diancie", tipos: ["rock", "fairy"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/719.png", region: "kalos", rol: "cientifico", precio: 25000, baseGen: 15.0, evolucionaA: null, xpEvol: null, stats: { hp: 50, atk: 100, def: 150, spa: 100, spd: 150, spe: 50 }, legendario: true },
      { id: 785, nombre: "Tapu Koko", tipos: ["electric", "fairy"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/785.png", region: "alola", rol: "recaudador", precio: 30000, baseGen: 18.0, evolucionaA: null, xpEvol: null, stats: { hp: 70, atk: 115, def: 85, spa: 95, spd: 75, spe: 130 }, legendario: true },
      { id: 800, nombre: "Necrozma", tipos: ["psychic"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/800.png", region: "alola", rol: "luchador", precio: 40000, baseGen: 22.0, evolucionaA: null, xpEvol: null, stats: { hp: 97, atk: 107, def: 101, spa: 127, spd: 89, spe: 79 }, legendario: true },
      { id: 898, nombre: "Calyrex", tipos: ["psychic", "grass"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/898.png", region: "galar", rol: "cientifico", precio: 60000, baseGen: 30.0, evolucionaA: null, xpEvol: null, stats: { hp: 100, atk: 80, def: 80, spa: 130, spd: 130, spe: 80 }, legendario: true },
      { id: 905, nombre: "Enamorus", tipos: ["fairy", "flying"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/905.png", region: "galar", rol: "recaudador", precio: 35000, baseGen: 20.0, evolucionaA: null, xpEvol: null, stats: { hp: 74, atk: 115, def: 70, spa: 135, spd: 80, spe: 102 }, legendario: true },
      { id: 989, nombre: "Ogerpon", tipos: ["grass"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/989.png", region: "paldea", rol: "luchador", precio: 20000, baseGen: 16.0, evolucionaA: null, xpEvol: null, stats: { hp: 80, atk: 120, def: 90, spa: 80, spd: 90, spe: 110 } },
      { id: 1001, nombre: "Iron Hands", tipos: ["fighting", "electric"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1001.png", region: "paldea", rol: "recaudador", precio: 25000, baseGen: 20.0, evolucionaA: null, xpEvol: null, stats: { hp: 140, atk: 140, def: 100, spa: 50, spd: 100, spe: 60 } },
      { id: 1015, nombre: "Roaring Moon", tipos: ["dragon", "dark"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1015.png", region: "paldea", rol: "luchador", precio: 30000, baseGen: 25.0, evolucionaA: null, xpEvol: null, stats: { hp: 105, atk: 139, def: 97, spa: 73, spd: 97, spe: 119 }, legendario: true },
      { id: 1025, nombre: "Pecharunt", tipos: ["poison", "ghost"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1025.png", region: "paldea", rol: "cientifico", precio: 100000, baseGen: 35.0, evolucionaA: null, xpEvol: null, stats: { hp: 77, atk: 53, def: 77, spa: 125, spd: 113, spe: 35 }, legendario: true }
    ];

    // Añadir más Pokémon para llegar a 50
    for (let i = 10; i <= 50; i++) {
      if (!this.pokemonCache.find(p => p.id === i)) {
        const tipos = ["fire", "water", "grass", "electric", "psychic", "fighting", "normal"];
        const tipo = tipos[Math.floor(Math.random() * tipos.length)];
        const roles = ["recaudador", "cientifico", "explorador", "luchador"];
        const rol = roles[Math.floor(Math.random() * roles.length)];
        const base = 1 + Math.random() * 5;
        
        this.pokemonCache.push({
          id: i,
          nombre: `Pokémon${i}`,
          tipos: [tipo],
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`,
          region: ["kanto", "johto", "hoenn"][Math.floor(Math.random() * 3)],
          rol: rol,
          precio: 100 + i * 50,
          baseGen: base,
          evolucionaA: null,
          xpEvol: null,
          stats: { hp: 50, atk: 50, def: 50, spa: 50, spd: 50, spe: 50 },
          shiny: Math.random() < 0.05
        });
      }
    }

    this.tiposColores = {
      normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
      grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
      ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
      rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
      steel: '#B8B8D0', fairy: '#EE99AC'
    };

    this.objetosDisponibles = [
      { id: 'cinta_exp', nombre: "Cinta Exp", desc: "+50% XP ganado", tipo: "permanente", precio: 10000, efecto: { tipo: 'multiplicador', valor: 1.5, estadistica: 'xp' } },
      { id: 'amulet_coin', nombre: "Amuleto Moneda", desc: "+50% monedas ganadas", tipo: "permanente", precio: 10000, efecto: { tipo: 'multiplicador', valor: 1.5, estadistica: 'monedas' } },
      { id: 'power_bracer', nombre: "Brazalera Poder", desc: "+30% daño en batallas", tipo: "equipable", precio: 15000, efecto: { tipo: 'multiplicador', valor: 1.3, estadistica: 'daño' } },
      { id: 'destiny_knot', nombre: "Nudo Destino", desc: "+20% probabilidad shiny", tipo: "permanente", precio: 50000, efecto: { tipo: 'multiplicador', valor: 1.2, estadistica: 'shiny' } },
      { id: 'leftovers', nombre: "Restos", desc: "Recupera 5% HP por turno en batallas", tipo: "equipable", precio: 20000, efecto: { tipo: 'fijo', valor: 0.05, estadistica: 'hp' } }
    ];

    this.inicializar();
  }

  inicializar() {
    this.cargarGuardado();
    this.configurarEventos();
    this.configurarDragAndDrop();
    this.iniciarMotores();
    this.renderTodo();
    this.reproducirMusica();
    this.mostrarNotificacion("¡Bienvenido a Pokémon Idle: Legendary Edition!", "success", 5000);
    this.mostrarNotificacion("¡Completa misiones, gana batallas y alcanza el prestigio!", "info", 6000);
  }

  configurarEventos() {
    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
        this.renderTab(btn.dataset.tab);
      });
    });

    // Filtros de tienda
    document.getElementById('busqueda-tienda')?.addEventListener('input', () => this.filtrarTienda());
    document.getElementById('filtro-tipo')?.addEventListener('change', () => this.filtrarTienda());
    document.getElementById('filtro-region')?.addEventListener('change', () => this.filtrarTienda());
    document.getElementById('filtro-rareza')?.addEventListener('change', () => this.filtrarTienda());

    // Filtro de equipo
    document.getElementById('busqueda-equipo')?.addEventListener('input', () => this.filtrarEquipo());
    document.getElementById('filtro-equipo-rol')?.addEventListener('change', () => this.filtrarEquipo());

    // Botones de acciones
    document.getElementById('toggle-theme')?.addEventListener('click', () => this.toggleTema());
    document.getElementById('export-btn')?.addEventListener('click', () => this.exportarGuardado());
    document.getElementById('import-btn')?.addEventListener('click', () => this.mostrarModalImportar());
    document.getElementById('confirm-import')?.addEventListener('click', () => this.importarGuardado());

    // Batallas
    document.getElementById('start-battle')?.addEventListener('click', () => this.iniciarBatalla());
    document.getElementById('battle-difficulty')?.addEventListener('change', () => this.actualizarEnemigo());

    // Huevos
    document.getElementById('add-egg')?.addEventListener('click', () => this.aniadirHuevo());

    // Prestigio
    document.getElementById('prestige-btn')?.addEventListener('click', () => this.iniciarPrestigio());

    // Cerrar modal
    document.querySelector('.close-modal')?.addEventListener('click', () => {
      document.getElementById('pokemon-modal').style.display = 'none';
      document.getElementById('import-modal').style.display = 'none';
    });

    // Click fuera del modal
    window.addEventListener('click', (event) => {
      const modal1 = document.getElementById('pokemon-modal');
      const modal2 = document.getElementById('import-modal');
      if (event.target === modal1) {
        modal1.style.display = 'none';
      }
      if (event.target === modal2) {
        modal2.style.display = 'none';
      }
    });

    // Misiones
    document.querySelectorAll('.btn-chapter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const region = e.target.closest('.region-chapter').dataset.region;
        this.cambiarCapitulo(region);
      });
    });
  }

  configurarDragAndDrop() {
    // Hacer que los Pokémon del equipo sean arrastrables
    document.addEventListener('mousedown', (e) => {
      if (e.target.closest('.pokemon-card') && e.target.closest('#equipo-grid')) {
        const card = e.target.closest('.pokemon-card');
        const pokemonId = parseInt(card.dataset.id);
        const pokemon = this.state.equipo.find(p => p.id === pokemonId);
        
        if (pokemon) {
          this.iniciarArrastre(card, pokemon);
        }
      }
    });

    // Configurar slots como drop targets
    document.querySelectorAll('.pokemon-slot').forEach(slot => {
      slot.addEventListener('dragover', (e) => {
        e.preventDefault();
        slot.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
        slot.style.borderColor = 'var(--primary)';
      });

      slot.addEventListener('dragleave', () => {
        slot.style.backgroundColor = '';
        slot.style.borderColor = '';
      });

      slot.addEventListener('drop', (e) => {
        e.preventDefault();
        slot.style.backgroundColor = '';
        slot.style.borderColor = '';
        
        const pokemonId = parseInt(e.dataTransfer.getData('pokemonId'));
        const rol = slot.dataset.rol;
        
        this.asignarPokemonARol(pokemonId, rol);
      });
    });
  }

  iniciarArrastre(card, pokemon) {
    const clone = card.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.pointerEvents = 'none';
    clone.style.opacity = '0.8';
    clone.style.zIndex = '1000';
    clone.classList.add('dragging');
    
    document.body.appendChild(clone);

    const moveHandler = (e) => {
      clone.style.transform = `translate(${e.clientX - 50}px, ${e.clientY - 50}px)`;
    };

    const upHandler = () => {
      document.body.removeChild(clone);
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);

    // Set data for drop
    const dataTransfer = new DataTransfer();
    dataTransfer.setData('pokemonId', pokemon.id.toString());
    const dragEvent = new DragEvent('dragstart', { dataTransfer });
    card.dispatchEvent(dragEvent);
  }

  asignarPokemonARol(pokemonId, rol) {
    // Desactivar cualquier Pokémon en ese rol
    const anterior = this.state.rolesActivos[rol];
    if (anterior) {
      const anteriorCard = document.querySelector(`.pokemon-card[data-id="${anterior.id}"]`);
      if (anteriorCard) {
        anteriorCard.classList.remove('active');
      }
    }

    // Asignar nuevo Pokémon
    const pokemon = this.state.equipo.find(p => p.id === pokemonId);
    if (pokemon) {
      this.state.rolesActivos[rol] = pokemon;
      const card = document.querySelector(`.pokemon-card[data-id="${pokemon.id}"]`);
      if (card) {
        card.classList.add('active');
      }
      
      // Actualizar slot visual
      const slot = document.getElementById(`${rol}-slot`);
      slot.innerHTML = `
        <div class="slot-label">${this.getIconoRol(rol)} ${this.getNombreRol(rol)}</div>
        <div class="slot-content">
          <img src="${pokemon.sprite}" alt="${pokemon.nombre}" class="pokemon-sprite" style="width: 60px; height: 60px;">
          <div>${pokemon.nombre}</div>
          <div>Nv. ${pokemon.nivel}</div>
        </div>
      `;
      
      this.mostrarNotificacion(`¡${pokemon.nombre} asignado como ${this.getNombreRol(rol)}!`, "success");
      this.comprobarMision('kanto3'); // Mision de equipo completo
      this.guardar();
    }
  }

  getIconoRol(rol) {
    const iconos = { recaudador: '💰', cientifico: '⚡', explorador: '🗺️', luchador: '🥊' };
    return iconos[rol] || '❓';
  }

  getNombreRol(rol) {
    const nombres = { recaudador: 'Recaudador', cientifico: 'Científico', explorador: 'Explorador', luchador: 'Luchador' };
    return nombres[rol] || rol;
  }

  iniciarMotores() {
    setInterval(() => {
      this.generarRecursos();
      this.actualizarHuevos();
      this.actualizarEstadisticas();
      this.guardar();
    }, 1000);

    setInterval(() => {
      this.explorar();
    }, 5000);

    // Eventos diarios (cada 24 horas en juego = 30 segundos)
    setInterval(() => {
      this.eventoDiario();
    }, 30000);
  }

  generarRecursos() {
    let totalMonedas = 0;
    let totalXP = 0;

    // Aplicar multiplicadores de objetos permanentes
    let multMonedas = 1;
    let multXP = 1;
    
    this.state.objetos.forEach(obj => {
      if (obj.tipo === 'permanente') {
        if (obj.efecto.estadistica === 'monedas') multMonedas *= obj.efecto.valor;
        if (obj.efecto.estadistica === 'xp') multXP *= obj.efecto.valor;
      }
    });

    // Recaudador
    const recaudador = this.state.rolesActivos.recaudador;
    if (recaudador) {
      const mejora = this.state.mejoras.recaudador;
      const mult = mejora > 0 ? Math.pow(1.5, mejora) : 1;
      const gen = recaudador.baseGen * mult * (1 + recaudador.nivel * 0.1) * multMonedas;
      totalMonedas += gen;
    }

    // Científico
    const cientifico = this.state.rolesActivos.cientifico;
    if (cientifico) {
      const mejora = this.state.mejoras.cientifico;
      const mult = mejora > 0 ? Math.pow(1.5, mejora) : 1;
      const gen = cientifico.baseGen * mult * (1 + cientifico.nivel * 0.1) * multXP;
      totalXP += gen;
      cientifico.xp = (cientifico.xp || 0) + gen;
      if (cientifico.xp >= cientifico.nivel * 100) {
        cientifico.xp = 0;
        cientifico.nivel++;
        this.mostrarNotificacion(`¡${cientifico.nombre} subió al nivel ${cientifico.nivel}!`, "info");
      }
    }

    this.state.monedas += totalMonedas;
    this.state.xp += totalXP;
    this.renderStats();
  }

  explorar() {
    const explorador = this.state.rolesActivos.explorador;
    if (!explorador) return;

    const mejora = this.state.mejoras.explorador;
    const mult = mejora > 0 ? Math.pow(1.5, mejora) : 1;
    const prob = explorador.baseGen * mult;

    if (Math.random() < prob) {
      const aleatorio = this.pokemonCache[Math.floor(Math.random() * this.pokemonCache.length)];
      const esShiny = Math.random() < 0.05;
      const nuevo = { ...aleatorio, nivel: 1, xp: 0, activo: false, shiny: esShiny };
      this.state.equipo.push(nuevo);
      this.state.pokemonCapturados++;
      if (esShiny) this.state.shinyEncontrados++;
      this.mostrarNotificacion(`¡Capturaste un ${nuevo.shiny ? '✨ SHINY ' : ''}${nuevo.nombre}!`, "success");
      this.renderEquipo();
      this.comprobarLogros();
      this.comprobarMision('kanto1');
    }
  }

  comprarPokemon(pokemonData) {
    if (this.state.monedas < pokemonData.precio) {
      this.reproducirSonido('click');
      this.mostrarNotificacion("¡No tienes suficientes monedas!", "error");
      return;
    }
    
    this.state.monedas -= pokemonData.precio;
    const esShiny = Math.random() < 0.05;
    const nuevo = { ...pokemonData, nivel: 1, xp: 0, activo: false, shiny: esShiny };
    this.state.equipo.push(nuevo);
    this.state.pokemonCapturados++;
    if (esShiny) this.state.shinyEncontrados++;
    this.reproducirSonido('purchase');
    this.mostrarNotificacion(`¡${nuevo.nombre} se unió a tu equipo!`, "success");
    this.renderEquipo();
    this.comprobarLogros();
    this.comprobarMision('kanto1');
    this.guardar();
  }

  evolucionar(pokemon) {
    if (!pokemon.evolucionaA || (pokemon.xp || 0) < (pokemon.xpEvol || 1000)) {
      this.mostrarNotificacion("¡Necesitas más XP para evolucionar!", "error");
      return;
    }

    const evolucion = this.pokemonCache.find(p => 
      p.nombre.toLowerCase() === pokemon.evolucionaA.toLowerCase()
    );

    if (evolucion) {
      const nombreAnterior = pokemon.nombre;
      Object.assign(pokemon, {
        ...evolucion,
        nivel: 1,
        xp: 0,
        evolucionDe: nombreAnterior
      });
      this.mostrarNotificacion(`¡${nombreAnterior} evolucionó a ${pokemon.nombre}!`, "success");
      this.renderEquipo();
      this.comprobarMision('kanto2');
      this.guardar();
    } else {
      this.mostrarNotificacion("¡Evolución no disponible aún!", "error");
    }
  }

  comprarMejora(rol) {
    const mejoraActual = this.state.mejoras[rol];
    const costo = Math.floor(1000 * Math.pow(2, mejoraActual));
    
    if (this.state.monedas < costo) {
      this.mostrarNotificacion("¡No tienes suficientes monedas!", "error");
      return;
    }
    
    this.state.monedas -= costo;
    this.state.mejoras[rol] = mejoraActual + 1;
    this.renderMejoras();
    this.renderStats();
    this.mostrarNotificacion(`¡Mejora de ${this.getNombreRol(rol)} nivel ${this.state.mejoras[rol]} adquirida!`, "success");
    this.guardar();
  }

  comprarObjeto(objetoData) {
    if (this.state.monedas < objetoData.precio) {
      this.mostrarNotificacion("¡No tienes suficientes monedas!", "error");
      return;
    }
    
    this.state.monedas -= objetoData.precio;
    this.state.objetos.push(objetoData);
    this.mostrarNotificacion(`¡${objetoData.nombre} adquirido!`, "success");
    this.renderObjetos();
    this.renderStats();
    this.guardar();
  }

  aniadirHuevo() {
    if (this.state.monedas < 1000) {
      this.mostrarNotificacion("¡Necesitas 1000 monedas para un huevo!", "error");
      return;
    }
    
    if (this.state.huevos.length >= 3) {
      this.mostrarNotificacion("¡Máximo 3 huevos en incubación!", "error");
      return;
    }
    
    this.state.monedas -= 1000;
    const aleatorio = this.pokemonCache[Math.floor(Math.random() * this.pokemonCache.length)];
    this.state.huevos.push({
      pokemon: aleatorio,
      pasos: 0,
      totalPasos: 1000,
      shiny: Math.random() < 0.05
    });
    this.renderHuevos();
    this.mostrarNotificacion("¡Huevo añadido a la incubadora!", "success");
    this.guardar();
  }

  actualizarHuevos() {
    if (this.state.huevos.length === 0) return;
    
    this.state.pasos += 10; // Pasos por segundo
    document.getElementById('steps-count').textContent = this.state.pasos;
    
    for (let i = 0; i < this.state.huevos.length; i++) {
      this.state.huevos[i].pasos += 10;
      
      if (this.state.huevos[i].pasos >= this.state.huevos[i].totalPasos) {
        const huevo = this.state.huevos.splice(i, 1)[0];
        const esShiny = huevo.shiny;
        const nuevo = { ...huevo.pokemon, nivel: 1, xp: 0, activo: false, shiny: esShiny };
        this.state.equipo.push(nuevo);
        this.state.pokemonCapturados++;
        if (esShiny) this.state.shinyEncontrados++;
        this.mostrarNotificacion(`¡Tu huevo eclosionó! ¡${nuevo.nombre} ha nacido${esShiny ? '✨ SHINY' : ''}!`, "success");
        i--;
      }
    }
    
    this.renderHuevos();
  }

  renderHuevos() {
    document.getElementById('eggs-count').textContent = this.state.huevos.length;
    document.getElementById('steps-count').textContent = this.state.pasos;
    
    for (let i = 1; i <= 3; i++) {
      const slot = document.getElementById(`incubator-${i}`);
      if (i <= this.state.huevos.length) {
        const huevo = this.state.huevos[i-1];
        const porcentaje = Math.min(100, Math.floor((huevo.pasos / huevo.totalPasos) * 100));
        slot.innerHTML = `
          <div class="incubator-header">Incubadora ${i}</div>
          <div class="incubator-content">
            <img src="${huevo.pokemon.sprite}" alt="${huevo.pokemon.nombre}" style="width: 60px; height: 60px; image-rendering: pixelated;">
            <div>${huevo.pokemon.nombre}</div>
            <div class="egg-progress">
              <div class="egg-progress-bar" style="width: ${porcentaje}%"></div>
            </div>
            <div>${huevo.pasos}/${huevo.totalPasos} pasos</div>
          </div>
        `;
      } else {
        slot.innerHTML = `
          <div class="incubator-header">Incubadora ${i}</div>
          <div class="incubator-content">Vacía</div>
        `;
      }
    }
  }

  iniciarBatalla() {
    const dificultad = document.getElementById('battle-difficulty').value;
    const luchador = this.state.rolesActivos.luchador;
    
    if (!luchador) {
      this.mostrarNotificacion("¡Necesitas un Luchador activo para batallar!", "error");
      return;
    }
    
    this.reproducirSonido('battle');
    
    // Crear enemigo según dificultad
    let enemigo;
    if (dificultad === 'facil') {
      enemigo = this.pokemonCache.find(p => p.region === 'kanto' && !p.legendario) || this.pokemonCache[0];
    } else if (dificultad === 'normal') {
      enemigo = this.pokemonCache.find(p => p.region === 'johto' || p.region === 'hoenn') || this.pokemonCache[10];
    } else if (dificultad === 'dificil') {
      enemigo = this.pokemonCache.find(p => p.region === 'sinnoh' || p.region === 'teselia') || this.pokemonCache[20];
    } else {
      enemigo = this.pokemonCache.find(p => p.legendario) || this.pokemonCache.find(p => p.region === 'sinnoh');
    }
    
    // Calcular daño
    const poderLuchador = (luchador.stats.atk + luchador.stats.spa) * luchador.nivel;
    const poderEnemigo = (enemigo.stats.atk + enemigo.stats.spa) * (dificultad === 'facil' ? 0.5 : dificultad === 'normal' ? 1 : dificultad === 'dificil' ? 2 : 3);
    
    // Aplicar objetos equipables
    let multDaño = 1;
    this.state.objetos.forEach(obj => {
      if (obj.tipo === 'equipable' && obj.efecto.estadistica === 'daño') {
        multDaño *= obj.efecto.valor;
      }
    });
    
    const dañoLuchador = poderLuchador * multDaño;
    const vidaEnemigo = enemigo.stats.hp * 10;
    const vidaLuchador = luchador.stats.hp * 10;
    
    // Simular batalla
    let log = `¡Comienza la batalla!\n`;
    log += `Tu ${luchador.nombre} vs ${enemigo.nombre}\n\n`;
    
    let turnos = 0;
    let vidaE = vidaEnemigo;
    let vidaL = vidaLuchador;
    
    while (vidaE > 0 && vidaL > 0 && turnos < 20) {
      turnos++;
      // Tu ataque
      const critico = Math.random() < 0.1;
      const daño = dañoLuchador * (critico ? 1.5 : 1);
      vidaE -= daño;
      log += `Turno ${turnos}: ${luchador.nombre} ataca ${critico ? '¡CRÍTICO! ' : ''}(-${Math.floor(daño)} HP)\n`;
      
      if (vidaE <= 0) break;
      
      // Ataque enemigo
      const dañoE = poderEnemigo;
      vidaL -= dañoE;
      log += `${enemigo.nombre} contraataca (-${Math.floor(dañoE)} HP)\n\n`;
    }
    
    if (vidaE <= 0) {
      const recompensa = dificultad === 'facil' ? 1000 : dificultad === 'normal' ? 5000 : dificultad === 'dificil' ? 10000 : 25000;
      this.state.monedas += recompensa;
      this.state.batallasGanadas++;
      log += `\n🎉 ¡VICTORIA! Ganaste ${recompensa.toLocaleString()} monedas`;
      this.mostrarNotificacion(`¡Victoria contra ${enemigo.nombre}! +${recompensa.toLocaleString()} 💰`, "success");
      this.comprobarMision('kanto4');
    } else {
      log += `\n💀 ¡DERROTA! Tu ${luchador.nombre} fue derrotado`;
      this.mostrarNotificacion(`¡Derrota contra ${enemigo.nombre}!`, "error");
    }
    
    // Mostrar en UI
    document.getElementById('battle-messages').textContent = log;
    
    // Renderizar equipos
    this.renderEquipoBatalla();
    this.renderEnemigoBatalla(enemigo);
    this.renderStats();
    this.guardar();
  }

  renderEquipoBatalla() {
    const contenedor = document.getElementById('battle-team-display');
    contenedor.innerHTML = '';
    
    const luchador = this.state.rolesActivos.luchador;
    if (luchador) {
      contenedor.innerHTML = `
        <img src="${luchador.sprite}" alt="${luchador.nombre}" style="width: 80px; height: 80px; image-rendering: pixelated; margin-bottom: 10px;">
        <div><strong>${luchador.nombre}</strong></div>
        <div>Nivel: ${luchador.nivel}</div>
        <div>HP: ${luchador.stats.hp}</div>
      `;
    } else {
      contenedor.innerHTML = '<div>¡Activa un Luchador!</div>';
    }
  }

  renderEnemigoBatalla(enemigo) {
    const contenedor = document.getElementById('battle-enemy-display');
    contenedor.innerHTML = `
      <img src="${enemigo.sprite}" alt="${enemigo.nombre}" style="width: 80px; height: 80px; image-rendering: pixelated; margin-bottom: 10px;">
      <div><strong>${enemigo.nombre}</strong></div>
      <div>HP: ${enemigo.stats.hp}</div>
      <div>Tipo: ${enemigo.tipos.join(', ')}</div>
    `;
  }

  actualizarEnemigo() {
    const dificultad = document.getElementById('battle-difficulty').value;
    let enemigo;
    
    if (dificultad === 'facil') {
      enemigo = this.pokemonCache.find(p => p.region === 'kanto' && !p.legendario) || this.pokemonCache[0];
    } else if (dificultad === 'normal') {
      enemigo = this.pokemonCache.find(p => p.region === 'johto' || p.region === 'hoenn') || this.pokemonCache[10];
    } else if (dificultad === 'dificil') {
      enemigo = this.pokemonCache.find(p => p.region === 'sinnoh' || p.region === 'teselia') || this.pokemonCache[20];
    } else {
      enemigo = this.pokemonCache.find(p => p.legendario) || this.pokemonCache.find(p => p.region === 'sinnoh');
    }
    
    this.renderEnemigoBatalla(enemigo);
  }

  eventoDiario() {
    const eventos = [
      { tipo: 'monedas', valor: 5000, mensaje: "¡Evento diario! +5,000 monedas" },
      { tipo: 'xp', valor: 2000, mensaje: "¡Evento diario! +2,000 XP" },
      { tipo: 'pokemon', valor: 1, mensaje: "¡Evento diario! ¡Un Pokémon regalo!" }
    ];
    
    const evento = eventos[Math.floor(Math.random() * eventos.length)];
    
    if (evento.tipo === 'monedas') {
      this.state.monedas += evento.valor;
    } else if (evento.tipo === 'xp') {
      this.state.xp += evento.valor;
    } else {
      const aleatorio = this.pokemonCache[Math.floor(Math.random() * this.pokemonCache.length)];
      const nuevo = { ...aleatorio, nivel: 1, xp: 0, activo: false, shiny: Math.random() < 0.1 };
      this.state.equipo.push(nuevo);
      this.state.pokemonCapturados++;
      if (nuevo.shiny) this.state.shinyEncontrados++;
      evento.mensaje += ` ¡${nuevo.nombre}!`;
    }
    
    this.mostrarNotificacion(evento.mensaje, "success", 4000);
    this.renderStats();
    this.renderEquipo();
  }

  iniciarPrestigio() {
    // Verificar requisitos
    if (this.state.monedas < 1000000) {
      this.mostrarNotificacion("¡Necesitas 1,000,000 monedas para prestigio!", "error");
      return;
    }
    
    if (this.state.equipo.length < 10) {
      this.mostrarNotificacion("¡Necesitas al menos 10 Pokémon en tu equipo!", "error");
      return;
    }
    
    if (this.state.capituloActual !== 'kanto' || !this.misiones.kanto.every(m => m.completado)) {
      this.mostrarNotificacion("¡Debes completar todas las misiones de Kanto!", "error");
      return;
    }
    
    if (!confirm("⚠️ ¡ADVERTENCIA! El prestigio reiniciará tu progreso a cambio de mejoras permanentes. ¿Continuar?")) {
      return;
    }
    
    // Calcular recompensas
    const medallasGanadas = 1;
    const mejorasPermanentes = [
      { id: 'prestigio1', nombre: "Mejora de Prestigio Nivel 1", desc: "+10% a todas las generaciones", nivel: 1 }
    ];
    
    // Guardar lo que queremos mantener
    const medallasActuales = this.state.medallas;
    const prestigioActual = this.state.prestigio;
    const logrosActuales = { ...this.state.logros };
    const mejorasPermanentesActuales = [...this.state.mejorasPermanentes];
    
    // Reiniciar estado
    this.state = {
      monedas: 10000,
      xp: 5000,
      medallas: medallasActuales + medallasGanadas,
      prestigio: prestigioActual + 1,
      equipo: [],
      rolesActivos: { recaudador: null, cientifico: null, explorador: null, luchador: null },
      mejoras: { recaudador: 0, cientifico: 0, explorador: 0, luchador: 0 },
      objetos: [],
      huevos: [],
      pasos: 0,
      batallasGanadas: 0,
      pokemonCapturados: 0,
      shinyEncontrados: 0,
      misionesCompletadas: 0,
      capituloActual: 'kanto',
      misiones: {
        kanto: [
          { id: 'kanto1', nombre: "Primer Pokémon", desc: "Compra o captura tu primer Pokémon", completado: false, recompensa: 1000 },
          { id: 'kanto2', nombre: "Primer Evolución", desc: "Evoluciona un Pokémon", completado: false, recompensa: 2000 },
          { id: 'kanto3', nombre: "Equipo Completo", desc: "Activa un Pokémon en cada rol", completado: false, recompensa: 5000 },
          { id: 'kanto4', nombre: "Primera Batalla", desc: "Gana tu primera batalla", completado: false, recompensa: 3000 },
          { id: 'kanto5', nombre: "Campeón de Kanto", desc: "Completa todas las misiones", completado: false, recompensa: 10000 }
        ]
      },
      logros: logrosActuales,
      mejorasPermanentes: [...mejorasPermanentesActuales, ...mejorasPermanentes],
      notificaciones: [],
      musicaActivada: this.state.musicaActivada
    };
    
    this.mostrarNotificacion("¡PRESTIGIO COMPLETADO! 🏆", "success", 5000);
    this.mostrarNotificacion("¡Has ganado mejoras permanentes y 1 medalla!", "success", 5000);
    this.renderTodo();
    this.guardar();
    this.comprobarLogro('prestigio1');
  }

  cambiarCapitulo(region) {
    this.state.capituloActual = region;
    this.renderHistoria();
    this.mostrarNotificacion(`¡Iniciando capítulo de ${region.toUpperCase()}!`, "success");
  }

  comprobarMision(misionId) {
    const mision = this.misiones[this.state.capituloActual].find(m => m.id === misionId);
    if (mision && !mision.completado) {
      let completado = false;
      
      if (misionId === 'kanto1' && this.state.equipo.length > 0) completado = true;
      if (misionId === 'kanto2' && this.state.equipo.some(p => p.evolucionDe)) completado = true;
      if (misionId === 'kanto3' && Object.values(this.state.rolesActivos).filter(r => r).length === 4) completado = true;
      if (misionId === 'kanto4' && this.state.batallasGanadas > 0) completado = true;
      if (misionId === 'kanto5' && this.misiones.kanto.every(m => m.completado || m.id === 'kanto5')) {
        completado = this.misiones.kanto.filter(m => m.id !== 'kanto5').every(m => m.completado);
      }
      
      if (completado) {
        mision.completado = true;
        this.state.monedas += mision.recompensa;
        this.state.misionesCompletadas++;
        this.mostrarNotificacion(`¡Misión completada: ${mision.nombre}! +${mision.recompensa.toLocaleString()} 💰`, "success");
        this.renderHistoria();
        this.guardar();
      }
    }
  }

  comprobarLogros() {
    // Logros de cantidad
    if (!this.state.logros['primer_pokemon'].completado && this.state.equipo.length >= 1) {
      this.completarLogro('primer_pokemon');
    }
    if (!this.state.logros['10_pokemon'].completado && this.state.equipo.length >= 10) {
      this.completarLogro('10_pokemon');
    }
    if (!this.state.logros['shiny_primero'].completado && this.state.shinyEncontrados >= 1) {
      this.completarLogro('shiny_primero');
    }
    if (!this.state.logros['legendario'].completado && this.state.equipo.some(p => p.legendario)) {
      this.completarLogro('legendario');
    }
  }

  completarLogro(logroId) {
    if (this.state.logros[logroId] && !this.state.logros[logroId].completado) {
      this.state.logros[logroId].completado = true;
      this.state.monedas += this.state.logros[logroId].recompensa;
      this.mostrarNotificacion(`🎉 ¡LOGRO COMPLETADO: ${this.state.logros[logroId].nombre}! +${this.state.logros[logroId].recompensa.toLocaleString()} 💰`, "success");
      this.renderLogros();
      this.guardar();
    }
  }

  comprobarLogro(logroId) {
    this.completarLogro(logroId);
  }

  renderStats() {
    document.getElementById('monedas').textContent = Math.floor(this.state.monedas).toLocaleString();
    document.getElementById('xp').textContent = Math.floor(this.state.xp).toLocaleString();
    document.getElementById('medallas').textContent = this.state.medallas;
    document.getElementById('prestigio').textContent = this.state.prestigio;
  }

  renderEquipo() {
    const contenedor = document.getElementById('equipo-grid');
    
    if (this.state.equipo.length === 0) {
      contenedor.innerHTML = '<div class="loading-message">Tu equipo está vacío. ¡Compra Pokémon en la tienda!</div>';
      return;
    }

    // Filtrar si hay búsqueda o filtro
    const busqueda = document.getElementById('busqueda-equipo')?.value.toLowerCase() || '';
    const rolFiltro = document.getElementById('filtro-equipo-rol')?.value || '';
    
    let pokemonesFiltrados = [...this.state.equipo];
    
    if (busqueda) {
      pokemonesFiltrados = pokemonesFiltrados.filter(p => 
        p.nombre.toLowerCase().includes(busqueda) || 
        p.tipos.some(t => t.includes(busqueda))
      );
    }
    
    if (rolFiltro) {
      pokemonesFiltrados = pokemonesFiltrados.filter(p => p.rol === rolFiltro);
    }

    contenedor.innerHTML = '';

    pokemonesFiltrados.forEach(p => {
      const div = document.createElement('div');
      div.className = `pokemon-card ${p.activo ? 'active' : ''} ${p.shiny ? 'shiny' : ''} ${p.legendario ? 'legendary' : ''}`;
      div.dataset.id = p.id;
      div.draggable = true;

      // Tipos con colores
      let tiposHTML = '';
      p.tipos.forEach(tipo => {
        const color = this.tiposColores[tipo] || '#777';
        tiposHTML += `<span class="type-badge" style="background-color: ${color}">${tipo}</span>`;
      });

      div.innerHTML = `
        <div class="pokemon-header">
          <div class="pokemon-name">
            ${p.nombre} ${p.shiny ? '✨' : ''} ${p.legendario ? '🌟' : ''}
            <span class="pokemon-id">#${p.id.toString().padStart(3, '0')}</span>
          </div>
          <div class="pokemon-types">${tiposHTML}</div>
        </div>
        <div class="pokemon-sprite-container">
          <img src="${p.sprite}" alt="${p.nombre}" class="pokemon-sprite" 
               onerror="this.src='https://via.placeholder.com/90?text=No+Image'">
        </div>
        <div class="pokemon-stats">
          <div><strong>Rol:</strong> ${this.getNombreRol(p.rol)}</div>
          <div><strong>Nivel:</strong> ${p.nivel}</div>
          <div><strong>Región:</strong> ${p.region}</div>
          ${p.evolucionDe ? `<div><strong>Ev. de:</strong> ${p.evolucionDe}</div>` : ''}
        </div>
        <div class="pokemon-actions">
          ${p.evolucionaA && (p.xp || 0) >= (p.xpEvol || 1000) ? 
            `<button class="btn btn-warning" onclick="game.evolucionarPorId(${p.id})">✨ Evolucionar</button>` : ''}
          <button class="btn btn-primary" onclick="game.mostrarDetalles(${p.id})">Ver Detalles</button>
          <button class="btn btn-danger" onclick="game.venderPorId(${p.id})">Vender</button>
        </div>
      `;
      contenedor.appendChild(div);
    });
  }

  renderTienda() {
    const contenedor = document.getElementById('tienda-grid');
    contenedor.innerHTML = '';

    this.pokemonCache.forEach(p => {
      const div = document.createElement('div');
      div.className = `pokemon-card ${p.shiny ? 'shiny' : ''} ${p.legendario ? 'legendary' : ''}`;

      let tiposHTML = '';
      p.tipos.forEach(tipo => {
        const color = this.tiposColores[tipo] || '#777';
        tiposHTML += `<span class="type-badge" style="background-color: ${color}">${tipo}</span>`;
      });

      div.innerHTML = `
        <div class="pokemon-header">
          <div class="pokemon-name">
            ${p.nombre} ${p.shiny ? '✨' : ''} ${p.legendario ? '🌟' : ''}
            <span class="pokemon-id">#${p.id.toString().padStart(3, '0')}</span>
          </div>
          <div class="pokemon-types">${tiposHTML}</div>
        </div>
        <div class="pokemon-sprite-container">
          <img src="${p.sprite}" alt="${p.nombre}" class="pokemon-sprite" 
               onerror="this.src='https://via.placeholder.com/90?text=No+Image'">
        </div>
        <div class="pokemon-stats">
          <div><strong>Rol:</strong> ${this.getNombreRol(p.rol)}</div>
          <div><strong>Región:</strong> ${p.region}</div>
          <div><strong>Precio:</strong> ${p.precio.toLocaleString()} 💰</div>
          <div><strong>Base Gen:</strong> ${p.baseGen.toFixed(1)}</div>
        </div>
        <div class="pokemon-actions">
          <button class="btn btn-primary" ${this.state.monedas < p.precio ? 'disabled' : ''} 
                  onclick="game.comprarPokemonPorId(${p.id})">
            Comprar
          </button>
        </div>
      `;
      contenedor.appendChild(div);
    });
  }

  filtrarTienda() {
    const busqueda = document.getElementById('busqueda-tienda')?.value.toLowerCase() || '';
    const tipoFiltro = document.getElementById('filtro-tipo')?.value || '';
    const regionFiltro = document.getElementById('filtro-region')?.value || '';
    const rarezaFiltro = document.getElementById('filtro-rareza')?.value || '';

    let pokemonesFiltrados = [...this.pokemonCache];

    if (tipoFiltro) {
      pokemonesFiltrados = pokemonesFiltrados.filter(p => p.tipos.includes(tipoFiltro));
    }
    if (regionFiltro) {
      pokemonesFiltrados = pokemonesFiltrados.filter(p => p.region === regionFiltro);
    }
    if (rarezaFiltro) {
      if (rarezaFiltro === 'comun') pokemonesFiltrados = pokemonesFiltrados.filter(p => !p.legendario && !p.shiny);
      if (rarezaFiltro === 'raro') pokemonesFiltrados = pokemonesFiltrados.filter(p => !p.legendario && p.baseGen > 5);
      if (rarezaFiltro === 'legendario') pokemonesFiltrados = pokemonesFiltrados.filter(p => p.legendario);
      if (rarezaFiltro === 'shiny') pokemonesFiltrados = pokemonesFiltrados.filter(p => p.shiny);
    }
    if (busqueda) {
      pokemonesFiltrados = pokemonesFiltrados.filter(p => 
        p.nombre.toLowerCase().includes(busqueda) || 
        p.tipos.some(t => t.includes(busqueda))
      );
    }

    const contenedor = document.getElementById('tienda-grid');
    contenedor.innerHTML = '';

    if (pokemonesFiltrados.length === 0) {
      contenedor.innerHTML = '<div class="loading-message">No se encontraron Pokémon con esos filtros</div>';
      return;
    }

    pokemonesFiltrados.forEach(p => {
      const div = document.createElement('div');
      div.className = `pokemon-card ${p.shiny ? 'shiny' : ''} ${p.legendario ? 'legendary' : ''}`;

      let tiposHTML = '';
      p.tipos.forEach(tipo => {
        const color = this.tiposColores[tipo] || '#777';
        tiposHTML += `<span class="type-badge" style="background-color: ${color}">${tipo}</span>`;
      });

      div.innerHTML = `
        <div class="pokemon-header">
          <div class="pokemon-name">
            ${p.nombre} ${p.shiny ? '✨' : ''} ${p.legendario ? '🌟' : ''}
            <span class="pokemon-id">#${p.id.toString().padStart(3, '0')}</span>
          </div>
          <div class="pokemon-types">${tiposHTML}</div>
        </div>
        <div class="pokemon-sprite-container">
          <img src="${p.sprite}" alt="${p.nombre}" class="pokemon-sprite" 
               onerror="this.src='https://via.placeholder.com/90?text=No+Image'">
        </div>
        <div class="pokemon-stats">
          <div><strong>Rol:</strong> ${this.getNombreRol(p.rol)}</div>
          <div><strong>Región:</strong> ${p.region}</div>
          <div><strong>Precio:</strong> ${p.precio.toLocaleString()} 💰</div>
          <div><strong>Base Gen:</strong> ${p.baseGen.toFixed(1)}</div>
        </div>
        <div class="pokemon-actions">
          <button class="btn btn-primary" ${this.state.monedas < p.precio ? 'disabled' : ''} 
                  onclick="game.comprarPokemonPorId(${p.id})">
            Comprar
          </button>
        </div>
      `;
      contenedor.appendChild(div);
    });
  }

  filtrarEquipo() {
    this.renderEquipo();
  }

  renderMejoras() {
    for (let rol of ['recaudador', 'cientifico', 'explorador', 'luchador']) {
      const nivel = this.state.mejoras[rol];
      const costo = Math.floor(1000 * Math.pow(2, nivel));
      
      // Actualizar en el DOM si existe
      const nivelElem = document.getElementById(`nivel-${rol}`);
      const costoElem = document.getElementById(`costo-${rol}`);
      const btn = document.querySelector(`#upgrade-${rol} .btn-upgrade`);
      
      if (nivelElem) nivelElem.textContent = nivel;
      if (costoElem) costoElem.textContent = costo.toLocaleString();
      if (btn) btn.disabled = this.state.monedas < costo;
    }
  }

  renderObjetos() {
    // Mejoras permanentes
    const permanentContainer = document.getElementById('permanent-items');
    permanentContainer.innerHTML = '';
    
    this.objetosDisponibles
      .filter(obj => obj.tipo === 'permanente')
      .forEach(obj => {
        const div = document.createElement('div');
        div.className = `item-card ${this.state.objetos.some(o => o.id === obj.id) ? 'owned' : ''}`;
        
        div.innerHTML = `
          <div class="item-name">${obj.nombre}</div>
          <div class="item-desc">${obj.desc}</div>
          <div class="item-cost">${obj.precio.toLocaleString()} 💰</div>
          <button class="btn ${this.state.objetos.some(o => o.id === obj.id) ? 'btn-success' : 'btn-primary'}" 
                  ${this.state.objetos.some(o => o.id === obj.id) || this.state.monedas < obj.precio ? 'disabled' : ''} 
                  onclick="game.comprarObjetoPorId('${obj.id}')">
            ${this.state.objetos.some(o => o.id === obj.id) ? '✅ Adquirido' : 'Comprar'}
          </button>
        `;
        permanentContainer.appendChild(div);
      });
    
    // Objetos equipables
    const equipableContainer = document.getElementById('equippable-items');
    equipableContainer.innerHTML = '';
    
    this.objetosDisponibles
      .filter(obj => obj.tipo === 'equipable')
      .forEach(obj => {
        const div = document.createElement('div');
        div.className = `item-card ${this.state.objetos.some(o => o.id === obj.id) ? 'owned' : ''}`;
        
        div.innerHTML = `
          <div class="item-name">${obj.nombre}</div>
          <div class="item-desc">${obj.desc}</div>
          <div class="item-cost">${obj.precio.toLocaleString()} 💰</div>
          <button class="btn ${this.state.objetos.some(o => o.id === obj.id) ? 'btn-success' : 'btn-primary'}" 
                  ${this.state.objetos.some(o => o.id === obj.id) || this.state.monedas < obj.precio ? 'disabled' : ''} 
                  onclick="game.comprarObjetoPorId('${obj.id}')">
            ${this.state.objetos.some(o => o.id === obj.id) ? '✅ Adquirido' : 'Comprar'}
          </button>
        `;
        equipableContainer.appendChild(div);
      });
  }

  renderHistoria() {
    // Actualizar capítulos
    document.querySelectorAll('.region-chapter').forEach(chapter => {
      const region = chapter.dataset.region;
      if (region === this.state.capituloActual) {
        chapter.classList.add('active');
        chapter.classList.remove('locked');
        chapter.querySelector('button').disabled = false;
      } else if (region === 'johto' && this.misiones.kanto.every(m => m.completado)) {
        chapter.classList.remove('locked');
        chapter.querySelector('button').disabled = false;
      } else if (region === 'hoenn' && this.misiones.kanto.every(m => m.completado)) {
        chapter.classList.remove('locked');
        chapter.querySelector('button').disabled = false;
      }
    });
    
    // Actualizar misiones
    const missionsContainer = document.getElementById('missions-list');
    missionsContainer.innerHTML = '';
    
    if (this.misiones[this.state.capituloActual]) {
      this.misiones[this.state.capituloActual].forEach(mision => {
        const div = document.createElement('div');
        div.className = `mission-item ${mision.completado ? 'completed' : ''}`;
        
        div.innerHTML = `
          <h4>${mision.nombre} ${mision.completado ? '✅' : ''}</h4>
          <p>${mision.desc}</p>
          <div class="mission-reward">Recompensa: ${mision.recompensa.toLocaleString()} 💰</div>
        `;
        missionsContainer.appendChild(div);
      });
    }
  }

  renderPrestigio() {
    document.getElementById('prestige-cost').textContent = '1,000,000';
    document.getElementById('prestige-pokemon').textContent = '10';
    document.getElementById('prestige-chapters').textContent = '1';
    
    // Renderizar mejoras permanentes
    const perksContainer = document.getElementById('prestige-perks-list');
    perksContainer.innerHTML = '';
    
    if (this.state.mejorasPermanentes.length === 0) {
      perksContainer.innerHTML = '<div>Aún no tienes mejoras permanentes. ¡Completa un prestigio!</div>';
    } else {
      this.state.mejorasPermanentes.forEach(perk => {
        const div = document.createElement('div');
        div.className = 'prestige-perk';
        div.innerHTML = `
          <div>
            <div class="item-name">${perk.nombre}</div>
            <div class="item-desc">${perk.desc}</div>
          </div>
        `;
        perksContainer.appendChild(div);
      });
    }
  }

  renderLogros() {
    // Estadísticas
    document.getElementById('total-pokemon-caught').textContent = this.state.pokemonCapturados.toLocaleString();
    document.getElementById('total-money-earned').textContent = Math.floor(this.state.monedas).toLocaleString();
    document.getElementById('total-battles-won').textContent = this.state.batallasGanadas.toLocaleString();
    document.getElementById('shiny-found').textContent = this.state.shinyEncontrados.toLocaleString();
    
    // Logros
    const logrosContainer = document.getElementById('logros-grid');
    logrosContainer.innerHTML = '';
    
    Object.keys(this.state.logros).forEach(key => {
      const logro = this.state.logros[key];
      const div = document.createElement('div');
      div.className = `logro-card ${logro.completado ? 'completed' : ''}`;
      
      div.innerHTML = `
        <div class="logro-title">${logro.nombre} ${logro.completado ? '✅' : ''}</div>
        <div class="logro-desc">${logro.desc}</div>
        <div class="logro-reward">Recompensa: ${logro.recompensa.toLocaleString()} 💰</div>
      `;
      logrosContainer.appendChild(div);
    });
  }

  renderTab(tab) {
    switch(tab) {
      case 'equipo':
        this.renderEquipo();
        break;
      case 'tienda':
        this.filtrarTienda();
        break;
      case 'batallas':
        this.renderEquipoBatalla();
        this.actualizarEnemigo();
        break;
      case 'historia':
        this.renderHistoria();
        break;
      case 'huevos':
        this.renderHuevos();
        break;
      case 'objetos':
        this.renderObjetos();
        break;
      case 'prestigio':
        this.renderPrestigio();
        break;
      case 'logros':
        this.renderLogros();
        break;
    }
  }

  renderTodo() {
    this.renderStats();
    this.renderEquipo();
    this.renderTienda();
    this.renderMejoras();
    this.renderObjetos();
    this.renderHuevos();
    this.renderHistoria();
    this.renderPrestigio();
    this.renderLogros();
    
    // Actualizar slots activos
    for (let rol of ['recaudador', 'cientifico', 'explorador', 'luchador']) {
      const slot = document.getElementById(`${rol}-slot`);
      const pokemon = this.state.rolesActivos[rol];
      if (pokemon) {
        slot.innerHTML = `
          <div class="slot-label">${this.getIconoRol(rol)} ${this.getNombreRol(rol)}</div>
          <div class="slot-content">
            <img src="${pokemon.sprite}" alt="${pokemon.nombre}" class="pokemon-sprite" style="width: 60px; height: 60px;">
            <div>${pokemon.nombre}</div>
            <div>Nv. ${pokemon.nivel}</div>
          </div>
        `;
      }
    }
  }

  mostrarDetalles(pokemonId) {
    const pokemon = this.state.equipo.find(p => p.id === pokemonId) || 
                   this.pokemonCache.find(p => p.id === pokemonId);
    
    if (!pokemon) return;

    let tiposHTML = '';
    pokemon.tipos.forEach(tipo => {
      const color = this.tiposColores[tipo] || '#777';
      tiposHTML += `<span class="type-badge" style="background-color: ${color}; margin: 5px;">${tipo}</span>`;
    });

    const statsHTML = `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 15px 0;">
        <div><strong>HP:</strong> ${pokemon.stats.hp}</div>
        <div><strong>Ataque:</strong> ${pokemon.stats.atk}</div>
        <div><strong>Defensa:</strong> ${pokemon.stats.def}</div>
        <div><strong>Sp. Atk:</strong> ${pokemon.stats.spa}</div>
        <div><strong>Sp. Def:</strong> ${pokemon.stats.spd}</div>
        <div><strong>Velocidad:</strong> ${pokemon.stats.spe}</div>
      </div>
    `;

    const modalContent = document.getElementById('modal-pokemon-details');
    modalContent.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h2 style="color: var(--primary); margin-bottom: 20px;">${pokemon.nombre} ${pokemon.shiny ? '✨' : ''} ${pokemon.legendario ? '🌟' : ''}</h2>
        <img src="${pokemon.sprite}" alt="${pokemon.nombre}" style="width: 150px; height: 150px; image-rendering: pixelated; margin-bottom: 20px;">
        <div style="background: rgba(30, 41, 59, 0.5); padding: 15px; border-radius: 10px; margin: 20px 0;">
          <div><strong>ID:</strong> #${pokemon.id.toString().padStart(3, '0')}</div>
          <div><strong>Tipos:</strong> ${tiposHTML}</div>
          <div><strong>Región:</strong> ${pokemon.region}</div>
          <div><strong>Rol:</strong> ${this.getNombreRol(pokemon.rol)}</div>
          <div><strong>Nivel:</strong> ${pokemon.nivel || 1}</div>
          <div><strong>Generación Base:</strong> ${pokemon.baseGen.toFixed(1)}</div>
          ${statsHTML}
          ${pokemon.evolucionaA ? `<div><strong>Evoluciona a:</strong> ${pokemon.evolucionaA}</div>` : ''}
          ${pokemon.evolucionDe ? `<div><strong>Evolucionó de:</strong> ${pokemon.evolucionDe}</div>` : ''}
          <div><strong>En equipo:</strong> ${this.state.equipo.some(p => p.id === pokemon.id) ? '✅ Sí' : '❌ No'}</div>
        </div>
        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
          <button class="btn btn-primary" onclick="document.getElementById('pokemon-modal').style.display='none'">Cerrar</button>
        </div>
      </div>
    `;

    document.getElementById('pokemon-modal').style.display = 'block';
  }

  mostrarNotificacion(mensaje, tipo = "info", duracion = 3000) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = mensaje;
    
    // Colores según tipo
    switch(tipo) {
      case 'success': notif.style.background = 'var(--success)'; break;
      case 'error': notif.style.background = 'var(--danger)'; break;
      case 'info': notif.style.background = 'var(--primary)'; break;
      default: notif.style.background = 'var(--secondary)';
    }
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
      if (notif.parentNode) {
        notif.parentNode.removeChild(notif);
      }
    }, duracion);
  }

  reproducirSonido(tipo) {
    const audio = document.getElementById(`${tipo}-sound`);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
  }

  reproducirMusica() {
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic && this.state.musicaActivada) {
      bgMusic.volume = 0.3;
      bgMusic.play().catch(e => console.log("Background music play failed:", e));
    }
  }

  toggleTema() {
    const body = document.body;
    if (body.classList.contains('day-mode')) {
      body.classList.remove('day-mode');
      document.getElementById('toggle-theme').textContent = '🌙';
    } else {
      body.classList.add('day-mode');
      document.getElementById('toggle-theme').textContent = '☀️';
    }
  }

  exportarGuardado() {
    const guardado = {
      state: this.state,
      timestamp: new Date().toISOString()
    };
    const codigo = btoa(JSON.stringify(guardado));
    prompt("Copia este código para importarlo después:", codigo);
    this.mostrarNotificacion("¡Guardado exportado! Copia el código.", "success");
  }

  mostrarModalImportar() {
    document.getElementById('import-modal').style.display = 'block';
  }

  importarGuardado() {
    const codigo = document.getElementById('import-data').value;
    try {
      const json = atob(codigo);
      const guardado = JSON.parse(json);
      
      if (guardado.state) {
        this.state = guardado.state;
        this.renderTodo();
        this.mostrarNotificacion("¡Guardado importado con éxito!", "success");
        document.getElementById('import-modal').style.display = 'none';
        document.getElementById('import-data').value = '';
      } else {
        throw new Error("Formato inválido");
      }
    } catch (e) {
      this.mostrarNotificacion("¡Error al importar guardado!", "error");
      console.error("Error importando guardado:", e);
    }
  }

  actualizarEstadisticas() {
    // Aquí podrías añadir más estadísticas avanzadas
  }

  // Métodos para eventos
  comprarPokemonPorId(id) {
    const pokemon = this.pokemonCache.find(p => p.id === id);
    if (pokemon) this.comprarPokemon(pokemon);
  }

  evolucionarPorId(id) {
    const p = this.state.equipo.find(pk => pk.id === id);
    if (p) this.evolucionar(p);
  }

  venderPorId(id) {
    const index = this.state.equipo.findIndex(p => p.id === id);
    if (index !== -1) {
      const pokemon = this.state.equipo[index];
      this.state.monedas += Math.floor(pokemon.precio * 0.6);
      this.state.equipo.splice(index, 1);
      this.renderTodo();
      this.mostrarNotificacion(`¡Vendiste ${pokemon.nombre} por ${Math.floor(pokemon.precio * 0.6).toLocaleString()} monedas!`, "info");
    }
  }

  comprarObjetoPorId(id) {
    const objeto = this.objetosDisponibles.find(o => o.id === id);
    if (objeto) this.comprarObjeto(objeto);
  }

  guardar() {
    const estadoGuardable = {
      monedas: this.state.monedas,
      xp: this.state.xp,
      medallas: this.state.medallas,
      prestigio: this.state.prestigio,
      equipo: this.state.equipo,
      rolesActivos: {
        recaudador: this.state.rolesActivos.recaudador ? this.state.rolesActivos.recaudador.id : null,
        cientifico: this.state.rolesActivos.cientifico ? this.state.rolesActivos.cientifico.id : null,
        explorador: this.state.rolesActivos.explorador ? this.state.rolesActivos.explorador.id : null,
        luchador: this.state.rolesActivos.luchador ? this.state.rolesActivos.luchador.id : null
      },
      mejoras: this.state.mejoras,
      objetos: this.state.objetos,
      huevos: this.state.huevos,
      pasos: this.state.pasos,
      batallasGanadas: this.state.batallasGanadas,
      pokemonCapturados: this.state.pokemonCapturados,
      shinyEncontrados: this.state.shinyEncontrados,
      misionesCompletadas: this.state.misionesCompletadas,
      capituloActual: this.state.capituloActual,
      misiones: this.state.misiones,
      logros: this.state.logros,
      mejorasPermanentes: this.state.mejorasPermanentes,
      musicaActivada: this.state.musicaActivada
    };
    localStorage.setItem('pokemon_idle_legendary', JSON.stringify(estadoGuardable));
  }

  cargarGuardado() {
    const guardado = localStorage.getItem('pokemon_idle_legendary');
    if (guardado) {
      try {
        const data = JSON.parse(guardado);
        this.state.monedas = data.monedas || this.state.monedas;
        this.state.xp = data.xp || this.state.xp;
        this.state.medallas = data.medallas || this.state.medallas;
        this.state.prestigio = data.prestigio || this.state.prestigio;
        this.state.equipo = data.equipo || this.state.equipo;
        this.state.mejoras = data.mejoras || this.state.mejoras;
        this.state.objetos = data.objetos || this.state.objetos;
        this.state.huevos = data.huevos || this.state.huevos;
        this.state.pasos = data.pasos || this.state.pasos;
        this.state.batallasGanadas = data.batallasGanadas || this.state.batallasGanadas;
        this.state.pokemonCapturados = data.pokemonCapturados || this.state.pokemonCapturados;
        this.state.shinyEncontrados = data.shinyEncontrados || this.state.shinyEncontrados;
        this.state.misionesCompletadas = data.misionesCompletadas || this.state.misionesCompletadas;
        this.state.capituloActual = data.capituloActual || this.state.capituloActual;
        this.state.misiones = data.misiones || this.state.misiones;
        this.state.logros = data.logros || this.state.logros;
        this.state.mejorasPermanentes = data.mejorasPermanentes || this.state.mejorasPermanentes;
        this.state.musicaActivada = data.musicaActivada !== undefined ? data.musicaActivada : this.state.musicaActivada;
        
        // Reconectar referencias de roles activos
        if (data.rolesActivos) {
          for (let rol of ['recaudador', 'cientifico', 'explorador', 'luchador']) {
            if (data.rolesActivos[rol]) {
              const pokemon = this.state.equipo.find(p => p.id === data.rolesActivos[rol]);
              if (pokemon) {
                this.state.rolesActivos[rol] = pokemon;
              }
            }
          }
        }
      } catch (e) {
        console.error("Error al cargar guardado", e);
        this.mostrarNotificacion("Error al cargar guardado. Iniciando nuevo juego.", "error");
      }
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.game = new PokemonIdleLegendary();
});
