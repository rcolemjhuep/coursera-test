describe('favorite item validator directive', function () {
    var $compile;
    var $rootScope;
    var $httpBackend;
    var ApiPath;
    var html;

    beforeEach(module('public'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_, $injector) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $httpBackend = $injector.get('$httpBackend');
        ApiPath = $injector.get('ApiPath');

        var url = `${ApiPath}/menu_items`
        $httpBackend.when('HEAD', `${url}/BAD.json`)
            .respond(404, '');

        $httpBackend.when('HEAD', `${url}/D3.json`)
            .respond(200, '');

        $httpBackend.when('HEAD', `${url}/C9.json`)
            .respond(200, '');

        $httpBackend.when('HEAD', `${url}/.json`)
            .respond(404, '');
    }));

    beforeEach(function () {
        html = '\
        <form name="signUpForm" novalidate> \
           <input required type="text" name="favoriteDish" ng-model="signupCtrl.user.favoriteDish" signup > \
        </form>\
        '
    })

    it('Form is valid when requesting D3.json', function () {
        var signupCtrl = {
            user: {
                favoriteDish: "D3"
            }
        }

        $rootScope.signupCtrl = signupCtrl;

        var elem = $compile(html)($rootScope);
        $httpBackend.flush()
        $rootScope.$digest();

        expect(elem.html()).toContain("ng-valid-signup");
    });


    it('Form is valid when requesting C9.json', function () {
        var signupCtrl = {
            user: {
                favoriteDish: "C9"
            }
        }

        $rootScope.signupCtrl = signupCtrl;

        var elem = $compile(html)($rootScope);
        $httpBackend.flush()
        $rootScope.$digest();

        expect(elem.html()).toContain("ng-valid-signup");
    });


    it('Form is not valid when requesting BAD.json', function () {
        var signupCtrl = {
            user: {
                favoriteDish: "BAD"
            }
        }

        $rootScope.signupCtrl = signupCtrl;

        var elem = $compile(html)($rootScope);
        $httpBackend.flush()
        $rootScope.$digest();

        expect(elem.html()).toContain("ng-invalid-signup");
    })

    it('Form is not valid when empty', function () {
        var signupCtrl = {
            user: {
                favoriteDish: ""
            }
        }

        $rootScope.signupCtrl = signupCtrl;

        var elem = $compile(html)($rootScope);
        $rootScope.$digest();

        expect(elem.html()).toContain("ng-invalid-required");
    })
});