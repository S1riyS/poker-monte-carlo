import React from "react";
import { Container, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import i18n, { SupportedLanguage } from "src/i18n";
import { CardStyle } from "src/modules/poker/types";
import { RootState, useAppDispatch } from "src/store";
import {
  setCardStyle,
  setDeckColors,
  setLanguage,
} from "src/store/settings.reducer";

const SettingsPage = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const cardStyle = useSelector((state: RootState) => state.settings.cardStyle);
  const deckColors = useSelector(
    (state: RootState) => state.settings.deckColors,
  );
  const language = useSelector((state: RootState) => state.settings.language);

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
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!(e.target.value === "en" || e.target.value === "ru")) {
      return;
    }
    const lang = e.target.value as SupportedLanguage;
    i18n.changeLanguage(lang);
    dispatch(setLanguage(lang));
  };

  return (
    <Container>
      <h2>{t("pages.settings.title")}</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>{t("pages.settings.cardStyle.title")}</Form.Label>
          <Form.Select value={cardStyle} onChange={handleCardStyleChange}>
            <option value={CardStyle.SIMPLE}>
              {t("pages.settings.cardStyle.simple")}
            </option>
            <option value={CardStyle.MIRRORED}>
              {t("pages.settings.cardStyle.mirrored")}
            </option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t("pages.settings.deckColors.title")}</Form.Label>
          <Form.Select value={deckColors} onChange={handleDeckColorsChange}>
            <option value={2}>{t("pages.settings.deckColors.2colors")}</option>
            <option value={4}>{t("pages.settings.deckColors.4colors")}</option>
          </Form.Select>
        </Form.Group>
      </Form>

      <Form.Group className="mb-3">
        <Form.Label>{t("pages.settings.language")}</Form.Label>
        <Form.Select value={language} onChange={handleLanguageChange}>
          <option value={"en"}>English</option>
          <option value={"ru"}>Русский</option>
        </Form.Select>
      </Form.Group>
    </Container>
  );
};

export default SettingsPage;
