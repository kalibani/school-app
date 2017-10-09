module.exports = {
  userRole(role) {
    let menuDashboard = [];
    switch (role) {
      case "headmaster":
        menuDashboard = ['dashboard', 'student', 'subject', 'teacher']
        return menuDashboard
        break;
      case "teacher":
        menuDashboard = ['dashboard', 'student']
        return menuDashboard
        break;
      case "academic":
        menuDashboard = ['dashboard', 'student', 'subject']
        return menuDashboard
        break;
      default:
      return 'dashboard'
    }
  }
};
