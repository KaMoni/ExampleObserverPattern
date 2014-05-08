
//The observer knows a subject, which registers the observer.
//As soon as something happens with the subject, the observer gets notified and updates himself.
//In MVVM this would be the ViewModel.
var Observer = function () {
    var self = this;
    var subject;
    self.init = function () {

        $('#searchButton').click(function () { self.searchButtonClicked(); });

        subject = new Subject();
        subject.register(self);
    };

    self.searchButtonClicked = function () {
        subject.loadData();
    };

    self.update = function(context, data){
        if (context === 'loadDataCompleted') {
            self.buildTable(data);
        }
    }

    self.buildTable = function (data) {
        $('#resultTable').empty();
        var tableHtml = "<table id='resultTable'><thead><tr><th>First Name</th><th>Last Name</th><th>Organisation</th></tr></thead><tbody><tr><td>" + data.firstName + "</td><td>" + data.lastName + "</td><td>" + data.organisation + "</td></tr></tbody></table>";
        $('#resultTable').append(tableHtml);
    }
};

//The subject maintains a list of oberservers and notifies all observers when a certain event occurs, e.g. data has been loaded
// -> as a consequence, all observers update themselves 
//In MVVM this would be the Model.
var Subject = function () {
    var self = this;
    var observers = [];

    self.register = function (observer) {
        observers.push(observer);
    };

    self.loadData = function(){
        var data = {'firstName' :'Peter', 
                    'lastName' : 'Lustig', 
                    'organisation': 'Löwenzahn'
        };

        self.notify('loadDataCompleted', data);
    }

    self.notify = function (context, data) {
        for ( var i = 0; i < observers.length; i++ ){
            observers[i].update(context, data);
        }
    }
};
