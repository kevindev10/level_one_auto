import * as Icons from "react-icons/fa";
import CarRentalIcon from '@mui/icons-material/CarRental';
import { FaWallet } from "react-icons/fa";
import { FaTruckLoading } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";


export const navItems = [
  {
    id: 1,
    title: "Home",
    path: "./",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaHome />,
  },
  {
    id:2,
    title: "Stock",
    path: "./stock",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaCartArrowDown />,
  },
  {
    id: 3,
    title: "Previously Sold",
    path: "./previously-sold",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <FaTruckLoading/>,
  },

  {
    id:4,
    title: "Sell Your Car",
    path: "./sell-your-car",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <FaWallet/>,
  },

  {
    id: 5,
    title: "FAQ",
    path: "./frequently-asked-questions",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <FaQuestionCircle/>,
  },

  {
    id:6,
    title: "Contact Us",
    path: "./contactus",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaPhone/>,
  },


];
