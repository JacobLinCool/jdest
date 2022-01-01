import { log, command_exists, app_exists, confirm } from "../utils";

describe("utils", () => {
    describe("log", () => {
        it("should log", () => {
            console.log = jest.fn();
            log("Hello", "World");
            expect((console.log as jest.Mock<any, any>).mock.calls[0][1]).toBe("Hello");
            expect((console.log as jest.Mock<any, any>).mock.calls[0][2]).toBe("World");
        });
    });

    describe("command_exists", () => {
        test("should return true if the command exists", () => {
            expect(command_exists("node")).toBe(true);
        });
        test("should return false if the command doesn't exist", () => {
            expect(command_exists("foooooo")).toBe(false);
        });
    });

    describe("app_exists", () => {
        test("should return true if the app exists", () => {
            expect(app_exists("Google Chrome")).toBe(true);
        });
        test("should return false if the app doesn't exist", () => {
            expect(app_exists("Fooo oooo")).toBe(false);
        });
    });

    describe("confirm", () => {
        test("should return true if the user confirms", async () => {
            const answer = confirm("Are you sure?");
            process.stdin.emit("data", "y\n");
            expect(await answer).toBe(true);
        });
        test("should return false if the user doesn't confirm", async () => {
            const answer = confirm("Are you sure?");
            process.stdin.emit("data", "n\n");
            expect(await answer).toBe(false);
        });
    });
});
