import SlashCommand from "./SlashCommand";

class SlashCommandValidator {
  private static readonly NAME_REGEX: RegExp = /^[\P{Lu}\p{N}_-]+$/u;
  private static readonly NAME_MIN: number = 1;
  private static readonly NAME_MAX: number = 32;

  private static readonly DESC_MIN: number = 1;
  private static readonly DESC_MAX: number = 128;

  public static validate(command: SlashCommand): void {
    SlashCommandValidator.validateName(command.name);
    SlashCommandValidator.validateDesc(command.description);

    for (const alias of command.aliases) {
      SlashCommandValidator.validateName(alias);
    }
  }

  private static validateName(name: string): RangeError | undefined {
    const { length } = name;

    if (length < SlashCommandValidator.NAME_MIN || length > SlashCommandValidator.NAME_MAX) {
      return new RangeError(`${name} is not valid for a Slash Command`);
    }

    if (!SlashCommandValidator.NAME_REGEX.test(name)) {
      return new Error(`${name} is not valid for a Slash Command`);
    }
  }

  private static validateDesc(desc: string): RangeError | undefined {
    const { length } = desc;

    if (length < SlashCommandValidator.DESC_MIN || length > SlashCommandValidator.DESC_MAX) {
      return new RangeError(`${desc} is not valid for a Slash Command`);
    }
  }
}

export default SlashCommandValidator;
