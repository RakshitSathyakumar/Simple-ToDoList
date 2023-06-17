
module.exports.getDate=getDate;
function getDate()
{
    var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      var today = new Date();
    
      var day=today.toLocaleDateString("en-US",options);

      return day;
}
module.exports.getDay=getDay;
function getDay()
{
    var options = {
        weekday: "long",
      };
      var today = new Date();
    
      var day=today.toLocaleDateString("hi-IN",options);

      return day;
}