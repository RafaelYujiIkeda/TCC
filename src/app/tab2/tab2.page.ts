import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false
})
export class Tab2Page implements OnInit {
  map!: google.maps.Map;

  constructor() {}

  ngOnInit() {
    console.log('Iniciando carga do mapa...');
    this.loadMap();
  }

  loadMap() {
    if (typeof google === 'undefined' || !google.maps) {
      console.log('Google Maps API não carregada. Estado atual:', {
        googleDefined: typeof google !== 'undefined',
        mapsDefined: typeof google !== 'undefined' && !!google.maps
      });
      setTimeout(() => this.loadMap(), 500);
      return;
    }
    console.log('Google Maps API carregada com sucesso.');
    this.initializeMap();
  }

  initializeMap() {
    console.log('Inicializando o mapa...');
    const mapOptions: google.maps.MapOptions = {
      zoom: 15,
      center: { lat: -21.763409, lng: -43.349034 },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const mapElement = document.getElementById('map');
    if (mapElement) {
      this.map = new google.maps.Map(mapElement, mapOptions);
      console.log('Mapa criado com sucesso.');

      new google.maps.Marker({
        position: { lat: -21.763409, lng: -43.349034 },
        map: this.map,
        title: 'Local Inicial'
      });
    } else {
      console.error('Elemento #map não encontrado.');
    }
  }
}
