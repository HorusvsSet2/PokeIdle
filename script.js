// script.js
class PokemonIdleGame {
  constructor() {
    this.state = {
      monedas: 10000,
      xp: 5000,
      medallas: 0,
      equipo: [],
      mejoras: { recaudador: 0, cientifico: 0, explorador: 0, luchador: 0 },
      logros: {},
      pokedex: [],
      pokedexLoaded: false,
      cache: {}
    };

    this.tiposColores = {
      normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
      grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
      ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
      rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
      steel: '#B8B8D0', fairy: '#EE99AC'
    };

    this.roles = [
      { id: 'recaudador', nombre: 'Recaudador', icon: '💰', desc: 'Genera monedas' },
      { id: 'cientifico', nombre: 'Científico', icon: '⚡', desc: 'Genera XP' },
      { id: 'explorador', nombre: 'Explorador', icon: '🗺️', desc: 'Captura Pokémon' },
      { id: 'luchador', nombre: 'Luchador', icon: '🥊', desc: 'Gana batallas' }
    ];

    this.inicializar();
  }

  async inicializar() {
    await this.cargarPokedex();
    this.cargarGuardado();
    this.renderTodo();
    this.iniciarMotores();
    this.mostrarBienvenida();
  }

  async cargarPokedex() {
    if (localStorage.getItem('pokedex_cache')) {
      this.state.pokedex = JSON.parse(localStorage.getItem('pokedex_cache'));
      this.state.pokedexLoaded = true;
      return;
    }

    // Mostrar loading
    document.getElementById('tienda-grid').innerHTML = '<div class="loading">Cargando los 1025 Pokémon... Esto puede tardar unos segundos ⏳</div>';

    try {
      const pokedexCompleta = [];
      
      // Cargar primeros 1025 Pokémon (hasta Gen 9)
      for (let i = 1; i <= 1025; i++) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
          const data = await response.json();
          
          // Obtener especie para evolución y descripción
          const speciesResponse = await fetch(data.species.url);
          const speciesData = await speciesResponse.json();
          
          // Encontrar descripción en español
          let descripcion = "Descripción no disponible";
          const entry = speciesData.flavor_text_entries.find(
            e => e.language.name === 'es' && e.version.name === 'sword'
          ) || speciesData.flavor_text_entries[0];
          if (entry) descripcion = entry.flavor_text.replace(/\f/g, ' ');

          // Obtener cadena de evolución
          let evolucionDe = null;
          let evolucionaA = null;
          
          if (speciesData.evolution_chain) {
            const chainResponse = await fetch(speciesData.evolution_chain.url);
            const chainData = await chainResponse.json();
            
            // Buscar en la cadena
            const buscarEvolucion = (chain, nombre) => {
              if (chain.species.name === nombre) {
                if (chain.evolves_to && chain.evolves_to.length > 0) {
                  return chain.evolves_to[0].species.name;
                }
              }
              for (let evol of chain.evolves_to) {
                const result = buscarEvolucion(evol, nombre);
                if (result) return result;
              }
              return null;
            };
            
            evolucionaA = buscarEvolucion(chainData.chain, data.name);
          }

          // Asignar rol aleatorio (en un juego real, esto sería balanceado)
          const roles = ['recaudador', 'cientifico', 'explorador', 'luchador'];
          const rol = roles[Math.floor(Math.random() * roles.length)];

          // Calcular precio basado en ID y rareza
          const precioBase = 50 + (i * 2);
          const esLegendario = speciesData.is_legendary || speciesData.is_mythical;
          const precio = esLegendario ? precioBase * 10 : precioBase;

          const pokemon = {
            id: data.id,
            nombre: data.name.charAt(0).toUpperCase() + data.name.slice(1),
            nombre_original: data.name,
            tipos: data.types.map(t => t.type.name),
            sprite: data.sprites.front_default,
            sprite_shiny: data.sprites.front_shiny,
            stats: {
              hp: data.stats[0].base_stat,
              ataque: data.stats[1].base_stat,
              defensa: data.stats[2].base_stat,
              especial: (data.stats[3].base_stat + data.stats[4].base_stat) / 2,
              velocidad: data.stats[5].base_stat
            },
            descripcion,
            evolucionDe,
            evolucionaA,
            rol,
            precio,
            venta: Math.floor(precio * 0.6),
            xpEvol: evolucionaA ? 1000 : null,
            habilidad: this.generarHabilidad(rol, data.stats[1].base_stat),
            baseGen: this.calcularBaseGen(rol, data.stats),
            nivel: 1,
            xp: 0,
            activo: false,
            shiny: Math.random() < 0.05, // 5% de probabilidad shiny
            legendario: esLegendario,
            region: this.obtenerRegion(i)
          };

          pokedexCompleta.push(pokemon);
          
          // Actualizar progreso cada 100 Pokémon
          if (i % 100 === 0) {
            console.log(`Cargados ${i} Pokémon`);
          }

        } catch (error) {
          console.warn(`Error al cargar Pokémon ${i}:`, error);
        }
      }

      this.state.pokedex = pokedexCompleta;
      this.state.pokedexLoaded = true;
      localStorage.setItem('pokedex_cache', JSON.stringify(pokedexCompleta));
      
    } catch (error) {
      console.error("Error al cargar Pokédex:", error);
      alert("Hubo un error al cargar los Pokémon. Recargando...");
      location.reload();
    }
  }

  obtenerRegion(id) {
    if (id <= 151) return "kanto";
    if (id <= 251) return "johto";
    if (id <= 386) return "hoenn";
    if (id <= 493) return "sinnoh";
    if (id <= 649) return "teselia";
    if (id <= 721) return "kalos";
    if (id <= 809) return "alola";
    if (id <= 905) return "galar";
    return "paldea";
  }

  generarHabilidad(rol, ataque) {
    switch(rol) {
      case 'recaudador': return `+${(ataque/50).toFixed(1)} monedas/seg`;
      case 'cientifico': return `+${(ataque/60).toFixed(1)} XP/seg`;
      case 'explorador': return `${Math.min(80, Math.max(10, ataque/3)).toFixed(0)}% prob. captura`;
      case 'luchador': return `+${ataque} daño en batallas`;
      default: return "+1 recurso/seg";
    }
  }

  calcularBaseGen(rol, stats) {
    const totalStats = stats.reduce((sum, stat) => sum + stat.base_stat, 0);
    switch(rol) {
      case 'recaudador': return stats[1].base_stat / 40; // ataque
      case 'cientifico': return stats[3].base_stat / 40; // sp atk
      case 'explorador': return Math.min(0.8, stats[5].base_stat / 100); // velocidad
      case 'luchador': return totalStats / 200;
      default: return 1;
    }
  }

  iniciarMotores() {
    setInterval(() => {
      this.generarRecursos();
      this.comprobarLogros();
      this.guardar();
    }, 1000);

    setInterval(() => {
      this.explorar();
    }, 5000);
  }

  generarRecursos() {
    let totalMonedas = 0;
    let totalXP = 0;

    // Recaudador
    const recaudador = this.state.equipo.find(p => p.rol === "recaudador" && p.activo);
    if (recaudador) {
      const mejora = this.state.mejoras.recaudador;
      const mult = mejora > 0 ? Math.pow(1.5, mejora) : 1;
      const gen = recaudador.baseGen * mult * (1 + recaudador.nivel * 0.1);
      totalMonedas += gen;
    }

    // Científico
    const cientifico = this.state.equipo.find(p => p.rol === "cientifico" && p.activo);
    if (cientifico) {
      const mejora = this.state.mejoras.cientifico;
      const mult = mejora > 0 ? Math.pow(1.5, mejora) : 1;
      const gen = cientifico.baseGen * mult * (1 + cientifico.nivel * 0.1);
      totalXP += gen;
      cientifico.xp += gen;
      if (cientifico.xp >= cientifico.nivel * 100) {
        cientifico.xp = 0;
        cientifico.nivel++;
      }
    }

    this.state.monedas += totalMonedas;
    this.state.xp += totalXP;
    this.renderStats();
  }

  explorar() {
    const explorador = this.state.equipo.find(p => p.rol === "explorador" && p.activo);
    if (!explorador) return;

    const mejora = this.state.mejoras.explorador;
    const mult = mejora > 0 ? Math.pow(1.5, mejora) : 1;
    const prob = explorador.baseGen * mult;

    if (Math.random() < prob) {
      const aleatorio = this.state.pokedex[Math.floor(Math.random() * this.state.pokedex.length)];
      const nuevo = { ...aleatorio, activo: false, nivel: 1, xp: 0, shiny: Math.random() < 0.05 };
      this.state.equipo.push(nuevo);
      this.mostrarNotificacion(`¡Capturaste un ${nuevo.shiny ? '✨ SHINY ' : ''}${nuevo.nombre}!`);
      this.renderEquipo();
    }
  }

  comprarPokemon(pokemon) {
    if (this.state.monedas < pokemon.precio) return;
    this.state.monedas -= pokemon.precio;
    const nuevo = { ...pokemon, activo: false, nivel: 1, xp: 0 };
    this.state.equipo.push(nuevo);
    this.renderTodo();
    this.mostrarNotificacion(`¡${nuevo.nombre} se unió a tu equipo!`);
  }

  toggleActivo(pokemon) {
    this.state.equipo.forEach(p => {
      if (p.rol === pokemon.rol) p.activo = false;
    });
    pokemon.activo = !pokemon.activo;
    this.renderEquipo();
  }

  evolucionar(pokemon) {
    if (!pokemon.evolucionaA || pokemon.xp < (pokemon.xpEvol || 1000)) return;
    
    const evolucion = this.state.pokedex.find(p => 
      p.nombre_original === pokemon.evolucionaA && p.rol === pokemon.rol
    );
    
    if (!evolucion) {
      // Si no encuentra exacto, toma el primero con ese nombre
      const evolucionAlternativa = this.state.pokedex.find(p => 
        p.nombre_original === pokemon.evolucionaA
      );
      if (evolucionAlternativa) {
        Object.assign(pokemon, {
          ...evolucionAlternativa,
          nivel: 1,
          xp: 0,
          activo: pokemon.activo
        });
        this.mostrarNotificacion(`¡${pokemon.nombre} evolucionó!`);
        this.renderEquipo();
      }
      return;
    }

    Object.assign(pokemon, {
      ...evolucion,
      nivel: 1,
      xp: 0,
      activo: pokemon.activo
    });

    this.mostrarNotificacion(`¡${pokemon.nombre} evolucionó!`);
    this.renderEquipo();
  }

  renderStats() {
    document.getElementById('monedas').textContent = Math.floor(this.state.monedas).toLocaleString();
    document.getElementById('xp').textContent = Math.floor(this.state.xp).toLocaleString();
    document.getElementById('medallas').textContent = this.state.medallas;
  }

  renderEquipo() {
    const contenedor = document.getElementById('equipo-grid');
    contenedor.innerHTML = '';

    if (this.state.equipo.length === 0) {
      contenedor.innerHTML = '<div class="loading">Tu equipo está vacío. ¡Compra o captura Pokémon!</div>';
      return;
    }

    this.state.equipo.forEach(p => {
      const div = document.createElement('div');
      div.className = `pokemon-card ${p.activo ? 'active' : ''} ${p.shiny ? 'shiny' : ''}`;
      
      // Tipos con colores
      let tiposHTML = '';
      p.tipos.forEach(tipo => {
        const color = this.tiposColores[tipo] || '#777';
        tiposHTML += `<span class="type-badge" style="background-color: ${color}">${tipo}</span>`;
      });

      div.innerHTML = `
        <div class="pokemon-sprite">
          <img src="${p.shiny ? p.sprite_shiny : p.sprite}" alt="${p.nombre}" 
               onerror="this.src='https://via.placeholder.com/120?text=No+Image'">
        </div>
        <div class="pokemon-info">
          <h4>${p.nombre} ${p.shiny ? '✨' : ''} ${p.legendario ? '🌟' : ''}
            <span class="pokemon-id">#${p.id.toString().padStart(3, '0')}</span>
          </h4>
          <div class="types">${tiposHTML}</div>
          <div><strong>Rol:</strong> ${p.rol}</div>
          <div><strong>Habilidad:</strong> ${p.habilidad}</div>
          <div><strong>Nivel:</strong> ${p.nivel}</div>
          ${p.activo ? '<div style="color: var(--success); font-weight: bold;">✅ ACTIVO</div>' : ''}
          ${p.evolucionaA && p.xp >= (p.xpEvol || 1000) ? 
            `<button class="btn btn-warning" onclick="game.evolucionarPorId(${p.id})">✨ Evolucionar</button>` : ''}
          <button class="btn ${p.activo ? 'btn-danger' : 'btn-primary'}" 
                  onclick="game.toggleActivoPorId(${p.id})">
            ${p.activo ? 'Desactivar' : 'Activar'}
          </button>
          <button class="btn btn-danger" onclick="game.venderPorId(${p.id})">
            Vender (${p.venta.toLocaleString()}💰)
          </button>
        </div>
      `;
      contenedor.appendChild(div);
    });
  }

  renderTienda() {
    const contenedor = document.getElementById('tienda-grid');
    
    if (!this.state.pokedexLoaded) {
      contenedor.innerHTML = '<div class="loading">Cargando los 1025 Pokémon... Esto puede tardar unos segundos ⏳</div>';
      return;
    }

    // Filtros
    const tipoFiltro = document.getElementById('filtro-tipo')?.value || 'todos';
    const regionFiltro = document.getElementById('filtro-region')?.value || 'todos';
    const rolFiltro = document.getElementById('filtro-rol')?.value || 'todos';
    const busqueda = document.getElementById('busqueda')?.value.toLowerCase() || '';

    let pokemonesFiltrados = [...this.state.pokedex];

    if (tipoFiltro !== 'todos') {
      pokemonesFiltrados = pokemonesFiltrados.filter(p => p.tipos.includes(tipoFiltro));
    }
    if (regionFiltro !== 'todos') {
      pokemonesFiltrados = pokemonesFiltrados.filter(p => p.region === regionFiltro);
    }
    if (rolFiltro !== 'todos') {
      pokemonesFiltrados = pokemonesFiltrados.filter(p => p.rol === rolFiltro);
    }
    if (busqueda) {
      pokemonesFiltrados = pokemonesFiltrados.filter(p => 
        p.nombre.toLowerCase().includes(busqueda) || 
        p.tipos.some(t => t.includes(busqueda))
      );
    }

    contenedor.innerHTML = '';

    if (pokemonesFiltrados.length === 0) {
      contenedor.innerHTML = '<div class="loading">No se encontraron Pokémon con esos filtros</div>';
      return;
    }

    pokemonesFiltrados.forEach(p => {
      const div = document.createElement('div');
      div.className = 'pokemon-card';
      
      let tiposHTML = '';
      p.tipos.forEach(tipo => {
        const color = this.tiposColores[tipo] || '#777';
        tiposHTML += `<span class="type-badge" style="background-color: ${color}">${tipo}</span>`;
      });

      div.innerHTML = `
        <div class="pokemon-sprite">
          <img src="${p.sprite}" alt="${p.nombre}" 
               onerror="this.src='https://via.placeholder.com/120?text=No+Image'">
        </div>
        <div class="pokemon-info">
          <h4>${p.nombre} ${p.legendario ? '🌟' : ''}
            <span class="pokemon-id">#${p.id.toString().padStart(3, '0')}</span>
          </h4>
          <div class="types">${tiposHTML}</div>
          <div><strong>Rol:</strong> ${p.rol}</div>
          <div><strong>Habilidad:</strong> ${p.habilidad}</div>
          <div><strong>Región:</strong> ${p.region}</div>
          <div class="cost" style="margin: 10px 0; font-size: 1.2rem;">${p.precio.toLocaleString()} 💰</div>
          <button class="btn btn-primary" ${this.state.monedas < p.precio ? 'disabled' : ''} 
                  onclick="game.comprarPokemonPorId(${p.id})">
            Comprar
          </button>
        </div>
      `;
      contenedor.appendChild(div);
    });
  }

  renderMejoras() {
    const contenedor = document.getElementById('mejoras-grid');
    contenedor.innerHTML = '';

    this.roles.forEach(rol => {
      const mejoraActual = this.state.mejoras[rol.id];
      const siguienteNivel = mejoraActual + 1;
      const costo = Math.floor(1000 * Math.pow(2, mejoraActual));

      const div = document.createElement('div');
      div.className = 'pokemon-card';
      div.innerHTML = `
        <div class="pokemon-info">
          <h4>${rol.icon} ${rol.nombre}</h4>
          <div><strong>Nivel actual:</strong> ${mejoraActual}</div>
          <div><strong>Siguiente nivel:</strong> +50% efectividad</div>
          <div class="cost" style="margin: 15px 0; font-size: 1.3rem;">${costo.toLocaleString()} 💰</div>
          <button class="btn btn-success" ${this.state.monedas < costo ? 'disabled' : ''} 
                  onclick="game.comprarMejora('${rol.id}')">
            Mejorar a Nivel ${siguienteNivel}
          </button>
        </div>
      `;
      contenedor.appendChild(div);
    });
  }

  renderTodo() {
    this.renderStats();
    this.renderEquipo();
    this.renderTienda();
    this.renderMejoras();
  }

  // Métodos para eventos
  comprarPokemonPorId(id) {
    const pokemon = this.state.pokedex.find(p => p.id === id);
    if (pokemon) this.comprarPokemon(pokemon);
  }

  toggleActivoPorId(id) {
    const p = this.state.equipo.find(pk => pk.id === id);
    if (p) this.toggleActivo(p);
  }

  evolucionarPorId(id) {
    const p = this.state.equipo.find(pk => pk.id === id);
    if (p) this.evolucionar(p);
  }

  venderPorId(id) {
    const index = this.state.equipo.findIndex(p => p.id === id);
    if (index !== -1) {
      this.state.monedas += this.state.equipo[index].venta;
      this.state.equipo.splice(index, 1);
      this.renderTodo();
    }
  }

  comprarMejora(rol) {
    const mejoraActual = this.state.mejoras[rol];
    const costo = Math.floor(1000 * Math.pow(2, mejoraActual));
    
    if (this.state.monedas < costo) return;
    
    this.state.monedas -= costo;
    this.state.mejoras[rol] = mejoraActual + 1;
    this.renderMejoras();
    this.renderStats();
    this.mostrarNotificacion(`¡Mejora de ${rol} nivel ${this.state.mejoras[rol]} adquirida!`);
  }

  mostrarNotificacion(mensaje) {
    // Crear notificación flotante
    const notif = document.createElement('div');
    notif.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--success);
      color: #000;
      padding: 15px 25px;
      border-radius: 10px;
      font-weight: bold;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 1000;
      animation: slideIn 0.3s ease-out, fadeOut 0.5s ease-out 2.5s forwards;
    `;
    notif.textContent = mensaje;
    document.body.appendChild(notif);
    
    setTimeout(() => {
      if (notif.parentNode) {
        notif.parentNode.removeChild(notif);
      }
    }, 3000);
  }

  mostrarBienvenida() {
    setTimeout(() => {
      this.mostrarNotificacion("¡Bienvenido a Pokémon Idle ULTIMATE con 1025 Pokémon!");
      this.mostrarNotificacion("Compra, activa, mejora y evoluciona a tus favoritos");
    }, 1000);
  }

  guardar() {
    const estadoGuardable = {
      monedas: this.state.monedas,
      xp: this.state.xp,
      medallas: this.state.medallas,
      equipo: this.state.equipo,
      mejoras: this.state.mejoras,
      logros: this.state.logros
    };
    localStorage.setItem('pokemon_idle_save', JSON.stringify(estadoGuardable));
  }

  cargarGuardado() {
    const guardado = localStorage.getItem('pokemon_idle_save');
    if (guardado) {
      try {
        const data = JSON.parse(guardado);
        this.state.monedas = data.monedas || this.state.monedas;
        this.state.xp = data.xp || this.state.xp;
        this.state.medallas = data.medallas || this.state.medallas;
        this.state.equipo = data.equipo || this.state.equipo;
        this.state.mejoras = data.mejoras || this.state.mejoras;
        this.state.logros = data.logros || this.state.logros;
      } catch (e) {
        console.error("Error al cargar guardado", e);
      }
    }
  }

  comprobarLogros() {
    // Aquí irían los logros con los 1025 Pokémon
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.game = new PokemonIdleGame();
  
  // Eventos de pestañas
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
      
      // Si es la tienda, renderizar con filtros
      if (btn.dataset.tab === 'tienda') {
        game.renderTienda();
      }
    });
  });

  // Eventos de filtros
  document.getElementById('busqueda')?.addEventListener('input', () => game.renderTienda());
  document.getElementById('filtro-tipo')?.addEventListener('change', () => game.renderTienda());
  document.getElementById('filtro-region')?.addEventListener('change', () => game.renderTienda());
  document.getElementById('filtro-rol')?.addEventListener('change', () => game.renderTienda());
});
