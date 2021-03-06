const TOASTR_CONFIG = {
    debug: false,
        timeOut: 3000,
        extendedTimeOut: 1000,
        fadeIn: 300,
        fadeOut: 300,
        positionClass: 'toast-top-center'
};

class WorldViewModel {
    constructor() {
        this.continents = ko.observableArray([]);
        this.continent = ko.observable();
        this.countries = ko.observableArray([]);
        this.totalPopulation = ko.computed( () => {
            return this.countries().reduce((acc,country) => acc + country.population, 0 );
        });

        this.list = this.list.bind(this);
        this.init = this.init.bind(this);
        this.sortByPopulation = this.sortByPopulation.bind(this);
        this.removeCountry = this.removeCountry.bind(this);
    }
    sortByPopulation() {
        if (this.countries().length < 2) return;
        let countries = Array.from(this.countries());
        countries.sort( (c1,c2) => c1.population-c2.population);
        this.countries(countries);
    }

    removeCountry(country){
        let newCountries = this.countries().filter( ctry => ctry._id !== country._id );
        this.countries(newCountries);
    }

    init() {
        $.ajax(
            {
                method: "GET",
                cache: true,
                url: "http://localhost:6400/world/api/v1/continents",
                success: continents => {
                    continents.sort();
                    toastr.success("Continents has been retrieved!", "", TOASTR_CONFIG);
                    this.continents(continents)
                },
                error : (xhr,err,errorThrown) => {
                    toastr.error(JSON.parse(xhr.responseText), "", TOASTR_CONFIG);
                }
            }
        )
    }

    list(){
        $.ajax(
            {
                method: "GET",
                cache: false,
                url: `http://localhost:6400/world/api/v1/countries?continent=${this.continent()}`,
                success: countries => {
                    this.countries(countries);
                    toastr.success("Countries has been retrieved!", "", TOASTR_CONFIG);
                },
                error : (xhr,err,errorThrown) => {
                    toastr.error(JSON.parse(xhr.responseText), "", TOASTR_CONFIG);
                }
            }
        )
    }
}

const worldViewModel = new WorldViewModel();
$(document).ready(() => {
    ko.applyBindings(worldViewModel);
    worldViewModel.init();
})