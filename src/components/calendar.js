import * as React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import moment from "moment";

export default function Calendar() {
  const getData = (setData, setLoading) => {
    const dataUrl = "https://customerrest.herokuapp.com/gettrainings";
    setLoading(true);

    return fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setData(data);
          setLoading(false);
        }, 600);
      });
  };

  const styles = {
    toolbarRoot: {
      position: "relative",
    },
    progress: {
      position: "absolute",
      width: "100%",
      bottom: 0,
      left: 0,
    },
  };

  const ToolbarWithLoading = withStyles(styles, { name: "Toolbar" })(
    ({ children, classes, ...restProps }) => (
      <div className={classes.toolbarRoot}>
        <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
        <LinearProgress className={classes.progress} />
      </div>
    )
  );

  const mapAppointmentData = (appointment) => ({
    id: appointment.id,
    startDate: appointment.date,
    endDate: moment(appointment.date).add(appointment.duration, "minutes"),
    title:
      appointment.activity +
      " - " +
      appointment.customer.firstname +
      " " +
      appointment.customer.lastname,
  });

  const initialState = {
    data: [],
    loading: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "setLoading":
        return { ...state, loading: action.payload };
      case "setData":
        return { ...state, data: action.payload.map(mapAppointmentData) };
      default:
        return state;
    }
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { data, loading, currentViewName, currentDate } = state;
  const setCurrentViewName = React.useCallback(
    (nextViewName) =>
      dispatch({
        type: "setCurrentViewName",
        payload: nextViewName,
      }),
    [dispatch]
  );
  const setData = React.useCallback(
    (nextData) =>
      dispatch({
        type: "setData",
        payload: nextData,
      }),
    [dispatch]
  );
  const setCurrentDate = React.useCallback(
    (nextDate) =>
      dispatch({
        type: "setCurrentDate",
        payload: nextDate,
      }),
    [dispatch]
  );
  const setLoading = React.useCallback(
    (nextLoading) =>
      dispatch({
        type: "setLoading",
        payload: nextLoading,
      }),
    [dispatch]
  );

  React.useEffect(() => {
    getData(setData, setLoading);
  }, [setData, setLoading]);

  return (
    <div>
      <Scheduler data={data} height={660}>
        <ViewState
          currentDate={currentDate}
          currentViewName={currentViewName}
          onCurrentViewNameChange={setCurrentViewName}
          onCurrentDateChange={setCurrentDate}
        />
        <DayView />
        <WeekView />
        <MonthView />
        <Appointments />
        <Toolbar
          {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
        />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <AppointmentTooltip showOpenButton showCloseButton />
        <AppointmentForm readOnly />
      </Scheduler>
    </div>
  );
}
