import bandsReducer, { bandsAdded } from "../features/bands/bandsSlice";

describe("actions", () => {
  test("bandsAdded returns an action with a type of 'bands/bandsAdded' and a payload", () => {
    expect(bandsAdded("test")).toEqual({
      type: "bands/bandsAdded",
      payload: "test",
    });
  });
});

describe("reducer", () => {
  test("returns the correct initial state", () => {
    expect(bandsReducer(undefined, {})).toEqual({ entities: [] });
  });

  test("handles 'bands/bandsAdded'", () => {
    expect(
      bandsReducer(
        { entities: [] },
        {
          type: "bands/bandsAdded",
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
          type: "bands/bandsAdded",
          payload: "test 2",
        }
      )
    ).toEqual({
      entities: ["test", "test 2"],
    });
  });
});
