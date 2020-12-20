import bandsReducer, { bandAdded } from "../features/bands/bandsSlice";

describe("actions", () => {
  test("bandAdded returns an action with a type of 'bands/bandAdded' and a payload", () => {
    expect(bandAdded("test")).toEqual({
      type: "bands/bandAdded",
      payload: "test",
    });
  });
});

describe("reducer", () => {
  test("returns the correct initial state", () => {
    expect(bandsReducer(undefined, {})).toEqual({ entities: [] });
  });

  test("handles 'bands/bandAdded'", () => {
    expect(
      bandsReducer(
        { entities: [] },
        {
          type: "bands/bandAdded",
          payload: "test",
        }
      )
    ).toEqual({
      entities: ["test"],
    });

    expect(
      bandsReducer(
        {
          entities: ["test"],
        },
        {
          type: "bands/bandAdded",
          payload: "test 2",
        }
      )
    ).toEqual({
      entities: ["test", "test 2"],
    });
  });
});
