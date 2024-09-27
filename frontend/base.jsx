import Nav from "./navbar";
import Footer from "./footer";
import TopBar from "./topbar";


export default function Base({ children, pageTitle }) {
  return (
    <div>
     <title>{ pageTitle }</title>
      
      <script src="/vendor/jquery/jquery.min.js"></script>
        <script src="/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

        <script src="/vendor/jquery-easing/jquery.easing.min.js"></script>

        <script src="/js/sb-admin-2.min.js"></script>

        <script type="text/javascript" src="/js/dissapear_messages.js"></script>
      <link
        href="/vendor/fontawesome-free/css/all.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <link href="/css/sb-admin-2.min.css" rel="stylesheet" />
      <link rel="icon" href="/img/logo.png" />

      <div id="page-top">
        <div id="wrapper">
        <Nav />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
             {/* navbar here */}
            <TopBar />


              <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800"></h1>
                </div>

                {/* Page content goes here--> */}
                { children }
              </div>
            </div>
            < Footer />
          </div>
        </div>

        
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>

        
      </div>
    </div>
  );
}
