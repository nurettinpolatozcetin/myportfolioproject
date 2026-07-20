import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

function setup(props) {
  const user = userEvent.setup();
  render(<ContactForm {...props} />);
  return {
    user,
    nameInput: screen.getByLabelText(/name/i),
    emailInput: screen.getByLabelText(/email/i),
    messageInput: screen.getByLabelText(/message/i),
    submitButton: screen.getByRole("button", { name: /send message/i }),
  };
}

describe("ContactForm", () => {
  it("shows an error under every field when submitting an empty form", async () => {
    const { user, submitButton } = setup();

    await user.click(submitButton);

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
  });

  it("marks invalid fields with aria-invalid and aria-describedby", async () => {
    const { user, nameInput, submitButton } = setup();

    await user.click(submitButton);

    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(nameInput).toHaveAttribute("aria-describedby", "contact-name-error");
    expect(document.getElementById("contact-name-error")).toHaveTextContent(
      /name is required/i,
    );
  });

  it("shows a specific email error for an invalid email format", async () => {
    const { user, nameInput, emailInput, messageInput, submitButton } = setup();

    await user.type(nameInput, "Ada Lovelace");
    await user.type(emailInput, "not-an-email");
    await user.type(messageInput, "Hello there");
    await user.click(submitButton);

    expect(
      await screen.findByText(/please enter a valid email address/i),
    ).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
  });

  it("does not submit when the form is invalid", async () => {
    const onSubmitSuccess = vi.fn();
    const { user, submitButton } = setup({ onSubmitSuccess });

    await user.click(submitButton);

    expect(onSubmitSuccess).not.toHaveBeenCalled();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("clears an error once the related field becomes valid", async () => {
    const { user, nameInput, emailInput, messageInput, submitButton } = setup();

    await user.click(submitButton);
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();

    await user.type(nameInput, "Grace Hopper");
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();

    // Fix email from invalid to valid and confirm its error clears too
    await user.type(emailInput, "not-valid");
    await user.click(submitButton);
    expect(
      await screen.findByText(/please enter a valid email address/i),
    ).toBeInTheDocument();

    await user.clear(emailInput);
    await user.type(emailInput, "grace@example.com");
    expect(
      screen.queryByText(/please enter a valid email address/i),
    ).not.toBeInTheDocument();

    await user.type(messageInput, "A valid message");
  });

  it("shows a success message and clears the form on valid submission", async () => {
    const onSubmitSuccess = vi.fn();
    const { user, nameInput, emailInput, messageInput, submitButton } = setup({
      onSubmitSuccess,
    });

    await user.type(nameInput, "Ada Lovelace");
    await user.type(emailInput, "ada@example.com");
    await user.type(messageInput, "Hello, this is a test message.");
    await user.click(submitButton);

    expect(onSubmitSuccess).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Hello, this is a test message.",
    });

    expect(await screen.findByRole("status")).toHaveTextContent(
      /thanks! your message has been sent/i,
    );

    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(messageInput).toHaveValue("");
  });

  it("is fully keyboard operable (tab through fields and submit with Enter)", async () => {
    const onSubmitSuccess = vi.fn();
    const { user, nameInput, emailInput, messageInput } = setup({
      onSubmitSuccess,
    });

    await user.tab();
    expect(nameInput).toHaveFocus();
    await user.keyboard("Ada Lovelace");

    await user.tab();
    expect(emailInput).toHaveFocus();
    await user.keyboard("ada@example.com");

    await user.tab();
    expect(messageInput).toHaveFocus();
    await user.keyboard("Hello from the keyboard.");

    await user.tab();
    const submitButton = screen.getByRole("button", { name: /send message/i });
    expect(submitButton).toHaveFocus();

    await user.keyboard("{Enter}");

    expect(onSubmitSuccess).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Hello from the keyboard.",
    });
  });
});
