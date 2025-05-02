import React from "react";
import { Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CardStyle } from "src/modules/poker/types";
import { RootState, useAppDispatch } from "src/store";
import { setCardStyle, setDeckColors } from "src/store/settings.reducer";

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const cardStyle = useSelector((state: RootState) => state.settings.cardStyle);
  const deckColors = useSelector(
    (state: RootState) => state.settings.deckColors,
  );

  const handleCardStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as CardStyle;
    dispatch(setCardStyle(selected));
  };
  const handleDeckColorsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!(e.target.value === "2" || e.target.value === "4")) {
      return;
    }
    const selected = +e.target.value as 2 | 4;
    dispatch(setDeckColors(selected));
  };

  return (
    <Container>
      <h2>Settings</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>card style</Form.Label>
          <Form.Select value={cardStyle} onChange={handleCardStyleChange}>
            <option value={CardStyle.SIMPLE}>Simple</option>
            <option value={CardStyle.MIRRORED}>Mirrored</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>deck colors</Form.Label>
          <Form.Select value={deckColors} onChange={handleDeckColorsChange}>
            <option value={2}>2 colors</option>
            <option value={4}>4 colors</option>
          </Form.Select>
        </Form.Group>
      </Form>
      {/* <div className="form-group mt-3">
        <label htmlFor="card-style">Card display style</label>
        <select
          id="card-style"
          className="form-control"
          value={cardStyle}
          onChange={handleCardStyleChange}
        >
          <option value={CardStyle.SIMPLE}>Simple</option>
          <option value={CardStyle.MIRRORED}>Mirrored</option>
        </select>
      </div> */}
    </Container>
  );
};

export default SettingsPage;
