import { useCallback } from "react";
import { Card, Form } from "react-bootstrap";
import { RiRefreshLine, RiUser3Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "src/store";
import {
  setIterationCount as setIterationCountAction,
  setPlayerCount as setPlayerCountAction,
} from "src/store/poker.reducer";

const SimulationSettingsForm = () => {
  const dispatch = useAppDispatch();
  const playerCount = useSelector(
    (state: RootState) => state.poker.playerCount,
  );
  const iterationCount = useSelector(
    (state: RootState) => state.poker.iterationCount,
  );
  const setPlayerCount = useCallback(
    (count: number) => {
      dispatch(setPlayerCountAction(count));
    },
    [dispatch],
  );
  const setIterationCount = useCallback(
    (count: number) => {
      dispatch(setIterationCountAction(count));
    },
    [dispatch],
  );

  // TODO: formik
  return (
    <Card>
      <Card.Header>Simulation Settings</Card.Header>
      <Card.Body>
        <Form.Group className="mb-3">
          <Form.Label>
            <RiUser3Line /> Player count
          </Form.Label>
          <Form.Control
            type="number"
            min={1}
            max={9}
            value={playerCount}
            onChange={({ target: { value: v } }) => setPlayerCount(+v)}
            onBlur={({ target: { value: v } }) =>
              setPlayerCount(Math.min(Math.max(+v, 1), 9))
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <RiRefreshLine /> Iteration count
          </Form.Label>
          <Form.Control
            type="number"
            min={1}
            max={1000000}
            value={iterationCount}
            onChange={({ target: { value: v } }) => setIterationCount(+v)}
            onBlur={({ target: { value: v } }) =>
              setIterationCount(Math.min(Math.max(+v, 1), 1000000))
            }
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default SimulationSettingsForm;
