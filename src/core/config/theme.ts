import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

export const themes = createMuiTheme({
  palette: {
    primary: {
      main: "#eaec2a",
      light: "#ffff66",
      dark: "#b4ba00",
      contrastText: "#000000",
    },
    secondary: {
      main: "#34383b",
      light: "#5e6265",
      dark: "#0d1215",
      contrastText: "#ffffff",
    },
  },
});

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "30px 60px 40px",
    borderRadius: "8px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#f50057 !important",
  },
  form: {
    marginTop: theme.spacing(2),
  },
}));
