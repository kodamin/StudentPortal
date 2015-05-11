/// <reference path="../typings/angularjs/angular.d.ts"/>

// Angular
angular.module('SchoolModule', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/allcourses',
        {
            templateUrl: '/partials/AllCourses.html',
            controller: 'SchoolController'
        })
        .when('/mycourses',
        {
            templateUrl: '/partials/MyCourses.html',
            controller: 'SchoolController'
        })
        .when('/course/:id', {
            templateUrl: '/partials/CourseDetails.html',
            controller: 'SchoolController'
        })
        .when('/about', {
            templateUrl: '/partials/About.html'
        })
        .when('/contact', {
            templateUrl: '/partials/Contact.html',
            controller: 'SchoolController'
        })
        .otherwise(
        {
            redirectTo: '/allcourses' 
        });
}])

.controller('SchoolController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

    
    // All Courses
    $scope.allcourses = [];
    $http.get('data/allcourses.json').success(function (data) {
        $scope.allcourses = data;
    });

    // Pagination
    $scope.currentPage = 0;
    $scope.pageSize = 8;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.allcourses.length / $scope.pageSize);
    }

    // Courses
    $scope.courses = [];
    $scope.SelectedCourse;
    $http.get('data/courses.json').success(function (data) {
        $scope.courses = data;

        for (var i = 0; i < $scope.courses.length; i++) {
            if ($scope.courses[i].course_id == $routeParams.id)
                $scope.SelectedCourse = $scope.courses[i];
        }
    });

    // Pagination
    $scope.currentPage2 = 0;
    $scope.pageSize2 = 8;
    $scope.numberOfPages2 = function () {
        return Math.ceil($scope.courses.length / $scope.pageSize2);
    }


    // Edit Course Details
    $scope.EditName = function () {
        if ($("#input_name:hidden").length) {
            $("#label_name").addClass("hidden");
            $("#input_name").removeClass("hidden");
        }
        else {
            $("#label_name").removeClass("hidden");
            $("#input_name").addClass("hidden");
        }
    };
    $scope.EditDescription = function () {
        if ($("#input_description:hidden").length) {
            $("#label_description").addClass("hidden");
            $("#input_description").removeClass("hidden");
        }
        else {
            $("#label_description").removeClass("hidden");
            $("#input_description").addClass("hidden");
        }
    };
    $scope.EditTerm = function () {
        if ($("#input_term:hidden").length) {
            $("#label_term").addClass("hidden");
            $("#input_term").removeClass("hidden");
        }
        else {
            $("#label_term").removeClass("hidden");
            $("#input_term").addClass("hidden");
        }
    };
    $scope.EditYear = function () {
        if ($("#input_year:hidden").length) {
            $("#label_year").addClass("hidden");
            $("#input_year").removeClass("hidden");
        }
        else {
            $("#label_year").removeClass("hidden");
            $("#input_year").addClass("hidden");
        }
    };

    // Filter
    $scope.Search = '';

    // Sort
    $scope.SelectedSort = 'year';
    $scope.SortByName = function () {
        $scope.SelectedSort = 'name';
    };
    $scope.SortByDescription = function () {
        $scope.SelectedSort = 'description';
    };
    $scope.SortByTerm = function () {
        $scope.SelectedSort = 'term';
    };
    $scope.SortByYear = function () {
        $scope.SelectedSort = 'year';
    };
}])

.controller('TitleController', ['$scope', function ($scope) {
    $scope.title = "School Portal";
    $scope.AllCourses = function () {
        $scope.title = "All Courses";
        $("#AllCourses").addClass("active");
        $("#MyCourses").removeClass("active");
    };
    $scope.MyCourses = function () {
        $scope.title = "My Courses";
        $("#AllCourses").removeClass("active");
        $("#MyCourses").addClass("active");
    }
}])

.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});