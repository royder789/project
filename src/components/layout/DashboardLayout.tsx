import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Shield,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Applications', href: '/application', icon: FileText },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Fair Lending ', href: '/fair-lending', icon: Shield },
  /*{ name: 'IncomeStability', href: '/income-stability', icon: Settings },*/
  { name: 'Fraud', href: '/fraud-detection', icon: Settings },
  { name: 'Time to Yes', href: '/tty', icon: Settings },
];

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'New application received', time: '5m ago' },
    { id: 2, text: 'Risk assessment completed', time: '1h ago' },
    { id: 3, text: 'System update scheduled', time: '2h ago' },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Handle scroll effect for adding a subtle shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gray-100 transition-colors duration-300">
      <div className="flex min-h-screen">
        {/* Sidebar - Desktop (Dark Mode) */}
        <div className={`hidden lg:flex lg:w-72 lg:flex-col ${scrolled ? 'lg:shadow-lg' : ''} transition-all duration-300`}>
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700">
            <div className="flex items-center flex-shrink-0 px-6">
              <Link 
                to="/" 
                className="flex items-center group transition-transform duration-300 hover:scale-105"
              >
                <Building2 className="w-10 h-10 text-blue-400 transform group-hover:rotate-12 transition-transform duration-300" />
                <span className="ml-3 text-2xl font-bold text-white">
                  Finसारथी
                </span>
              </Link>
            </div>
            
            <div className="mt-8 flex-grow flex flex-col">
              <nav className="flex-1 px-4 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 transform hover:translate-x-1 ${
                        isActive
                          ? 'bg-blue-700 text-blue-300 shadow-md'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <Icon className={`mr-3 h-5 w-5 transition-transform duration-300 ${
                        isActive 
                          ? 'text-blue-300 transform scale-110' 
                          : 'text-gray-500'
                      }`} />
                      <span className="transition-colors duration-300">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Dark Mode) */}
        <div
          className={`lg:hidden fixed inset-0 z-50 transform ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out`}
        >
          {/* Dark overlay */}
          <div 
            className="absolute inset-0 bg-gray-800 opacity-75" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          <div className="relative flex flex-col w-72 max-w-sm bg-gray-900 h-full">
            <div className="flex items-center justify-between p-4">
              <Link to="/" className="flex items-center">
                <Building2 className="w-8 h-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold text-white">
                  Finसारथी
                </span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-300 hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-700 text-blue-300'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-300' : 'text-gray-500'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1">
          {/* Top Navigation remains unchanged */}
          <div
            className={`sticky top-0 z-40 transition-all duration-300 ${
              scrolled ? 'bg-gray-100/80 backdrop-blur-sm shadow-md' : 'bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between px-4 h-16">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="flex items-center flex-1 px-4">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">Search</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                    </div>
                    <input
                      id="search"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-gray-100 text-sm transition-all duration-200 ease-in-out"
                      placeholder="Search applications..."
                      type="search"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200"
                  >
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5 focus:outline-none transform transition-all duration-200">
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-4">
                          Notifications
                        </h3>
                        <div className="space-y-3">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className="flex items-start p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            >
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900">
                                  {notification.text}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-3 focus:outline-none group"
                  >
                    <img
                      className="h-9 w-9 rounded-full ring-2 ring-white transition-transform duration-200 transform group-hover:scale-105"
                      src="https://static.vecteezy.com/system/resources/previews/001/223/998/non_2x/young-indian-boy-smiling-to-the-camera-free-photo.jpg"
                      alt="Profile"
                    />
                    <div className="hidden md:flex md:items-center">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-400 transition-colors duration-200">
                        MIHIR ROY
                      </span>
                      <ChevronDown className={`ml-2 h-4 w-4 text-gray-400 transition-transform duration-200 ${showProfileMenu ? 'transform rotate-180' : ''}`} />
                    </div>
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ease-out">
                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                        >
                          <LogOut className="mr-3 h-4 w-4 text-gray-400" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
