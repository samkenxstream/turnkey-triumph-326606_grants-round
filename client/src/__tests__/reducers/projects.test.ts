import "@testing-library/jest-dom";
import {
  projectsReducer,
  ProjectsState,
  Status,
} from "../../reducers/projects";

describe("projects reducer", () => {
  let state: ProjectsState;

  beforeEach(() => {
    state = {
      status: Status.Undefined,
      error: undefined,
      ids: [],
      events: {},
      applications: [],
    };
  });

  it("PROJECT_APPLICATIONS_LOADING updates state", async () => {
    const newState: ProjectsState = projectsReducer(state, {
      type: "PROJECT_APPLICATIONS_LOADING",
    });

    expect(newState.applications).toEqual([]);
  });

  it("PROJECT_APPLICATIONS_LOADED updates state", async () => {
    const newState: ProjectsState = projectsReducer(state, {
      type: "PROJECT_APPLICATIONS_LOADED",
      projectID: "12345",
      applications: [
        {
          round: {
            id: "0x12345",
          },
          status: "APPROVED",
        },
      ],
    });

    expect(newState.applications).toEqual([
      {
        round: { id: "0x12345" },
        status: "APPROVED",
      },
    ]);
  });

  it("PROJECT_APPLICATIONS_NOT_FOUND updates state", async () => {
    const newState: ProjectsState = projectsReducer(state, {
      type: "PROJECT_APPLICATIONS_NOT_FOUND",
      projectID: "12345",
      roundID: "0x12345",
    });

    expect(newState.applications).toEqual([
      {
        round: { id: "0x12345" },
        status: "PENDING",
      },
    ]);
  });

  it("PROJECT_APPLICATIONS_ERROR updates state", async () => {
    const newState: ProjectsState = projectsReducer(state, {
      type: "PROJECT_APPLICATIONS_ERROR",
      projectID: "12345",
      error: "error",
    });

    expect(newState.error).toBe("error");
  });
});
