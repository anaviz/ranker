function RankerCtrl($scope) {
  // some example items just to get us started
  $scope.items = [
    {name:'Doctor', x:1, y:10},
    {name:'Programmer', x:10, y:1}];
 
  $scope.addItem = function() {
    $scope.items.push({name:$scope.itemName, 
                        x:$scope.itemX, 
                        y:$scope.itemY});
    $scope.itemName = '';
    $scope.itemX = '';
    $scope.itemY = '';
  };
}