import React, { useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import usePhysicians from "../hooks/usePhysicians";
import useAppointments from "../hooks/useAppointments";
import useIsMountedRef from "../hooks/useIsMountedRef";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { physicians, loading, error, listPhysicians } = usePhysicians();
  const { listAppointmentsByPhysician } = useAppointments();
  const [selectedId, setSelectedId] = React.useState(null);

  const handleClick = (id) => {
    setSelectedId(id);
    listAppointmentsByPhysician(id);
  };

  const getPhysicians = useCallback(async () => {
    try {
      if (isMountedRef.current) {
        listPhysicians();
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getPhysicians();
  }, [getPhysicians]);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <ul>
        {physicians.map((physician) => (
          <>
            <li
              onClick={() => handleClick(physician.id)}
              style={{
                cursor: "pointer",
                backgroundColor: selectedId === physician.id ? "#f5f5f5" : "",
                listStyle: "none",
              }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={physician.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={physician.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {physician.specialty}
                      </Typography>
                      {` — ${physician.address}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </li>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </ul>
    </>
  );
}
