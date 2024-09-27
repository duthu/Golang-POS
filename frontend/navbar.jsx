
export default function Nav({}) {
  
  return (
    <div>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="{% url 'pos:index' %}"
        >
          <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="sidebar-brand-text mx-3">POS</div>
        </a>

        <hr className="sidebar-divider  mb-0" />

        <li className="nav-item  {% endif %}">
        
          <a className="nav-link" href="/home">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item ">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-tag"></i>
            <span>Products</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse show "
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <a className="collapse-item active" href="/categories">
                Categories
              </a>
              <a className="collapse-item active" href="/products">
                Products
              </a>
            </div>
          </div>
        </li>

        <hr className="sidebar-divider my-0" />

        

        <hr className="sidebar-divider my-0" />

        <li className="nav-item active ">
          <a className="nav-link" href="/sales">
            <i className="fas fa-fw fa-cart-plus"></i>
            <span>Sales</span>
          </a>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>
      </ul>
    </div>
  );
}
