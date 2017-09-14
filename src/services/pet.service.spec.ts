import { TestBed, inject } from '@angular/core/testing';
import { Jsonp, BaseRequestOptions,Response, ResponseOptions,RequestOptions,ConnectionBackend } from '@angular/http';
import { MockBackend, MockConnection} from '@angular/http/testing';
import { PetService } from './pet.service';

describe('Service: PetSevice', () => {
 let serviceUri: string = 'http://agl-developer-test.azurewebsites.net/people.json?callback=JSONP_CALLBACK';
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [               
                    Jsonp,
                    PetService,
                    { provide: RequestOptions, useClass: BaseRequestOptions },
                    { provide: ConnectionBackend, useClass: MockBackend },
            ]
        });      
    });
        
    it('should inject pet service', inject([PetService], (service: PetService) => {
            expect(service).toBeTruthy();
    }));

     it('should download all items from the backend', inject([ConnectionBackend, PetService], 
     (backend: MockBackend,
        service: PetService) => {        
        // Arrange
        let items = null;
        backend.connections.subscribe((c: MockConnection) => {
            expect(c.request.url).toEqual(serviceUri);
            c.mockRespond(new Response(new ResponseOptions({body: '[{"Cats":"Garfield"}]'})));
        });

        // Act
        service.getpetOwnerData().subscribe((q) => {
            items = q;
        });

        // Assert
        backend.verifyNoPendingRequests();
        expect(items).toEqual([{Cats:'Garfield'}]);
    }));
});

