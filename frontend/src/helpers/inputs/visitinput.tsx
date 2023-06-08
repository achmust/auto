export const VisitInput = () => {
  return (
    <div>
      <div className="form__group field p-2">
        <input type="time" className="form__field" name="visit" />
        <label htmlFor="visit" className="form__label">
          Vizito priežastis
        </label>
      </div>
    </div>
  );
};
