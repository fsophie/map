export class Address {

    public label: string;
    public latitude: number;
    public longitude: number;

    public geoJson: any;

    constructor(geoJson: any) {
        this.label = geoJson.properties.label;
        this.latitude = Number(geoJson.geometry.coordinates[1]);
        this.longitude = Number(geoJson.geometry.coordinates[0]);
        this.geoJson = geoJson;
    }
    
}
