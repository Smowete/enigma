import java.util.*;
import java.io.*;

public class Enigma {

	public static int[] rotor = new int[3];
	public static char[] standardKey;
	public static char[] key;


	public static int rotors = 3;

	public static void main(String[] args) throws FileNotFoundException {
		if (args.length != 4) {
			System.out.println("Usage: Java Enigma -e/-d <key file> <input file> <output file>");
			return;
		}
		
		String flag = args[0];
		String keyFileName = args[1];
		String inputFile = args[2];
		String outputFile = args[3];

		initialization(keyFileName);

		if (flag.equals("-e")) {
			startEncode(inputFile, outputFile);
		} else if (flag.equals("-d")) {
			startDecode(inputFile, outputFile);
		} else {
			System.out.println("Usage: Java Enigma -e/-d <key file> <input file> <output file>");
		}
	}

	public static void initialization(String keyFileName) throws FileNotFoundException {
		Scanner standardKeyInpupt = new Scanner(new File("data/key/standard.key"));
		Scanner keyInput = new Scanner(new File("data/key/" + keyFileName));

		String standardKeyString = standardKeyInpupt.nextLine().substring(9);
		String keyInputString = keyInput.nextLine();
		String keyString = keyInputString.substring(9);
		rotor[0] = Integer.parseInt(keyInputString.substring(0, 3));
		rotor[1] = Integer.parseInt(keyInputString.substring(3, 6));
		rotor[2] = Integer.parseInt(keyInputString.substring(6, 9));
		assert(rotor[0] >= 0 && rotor[0] <= 256);
		assert(rotor[1] >= 0 && rotor[1] <= 256);
		assert(rotor[2] >= 0 && rotor[2] <= 256);

		standardKey = new char[standardKeyString.length()];
		key = new char[keyString.length()];
		assert(standardKey.length == key.length);

		for (int i = 0; i < standardKey.length; i++) {
			standardKey[i] = standardKeyString.charAt(i);
			key[i] = keyString.charAt(i);
		}
	}

	public static void startEncode(String inputFile, String outputFile) throws FileNotFoundException {
		Scanner toCode = new Scanner(new File(inputFile));
		PrintStream coded = new PrintStream(new File(outputFile));
		process('e', toCode, coded);
	}

	public static void startDecode(String inputFile, String outputFile) throws FileNotFoundException {
		Scanner toDecode = new Scanner(new File(inputFile));
		PrintStream decoded = new PrintStream(new File(outputFile));
		process('d', toDecode, decoded);
	}

	public static void process(char ed, Scanner toDo, PrintStream after) {
		while (toDo.hasNextLine()) {
			String line = toDo.nextLine();
			for (int i = 0; i < line.length(); i++) {
				char curr = line.charAt(i);
				if (ed == 'e') {
					for (int j = 0; j < rotors; j++) {
						curr = encode(curr, rotor[j]);
					}
				} else {
					for (int j = 0; j < rotors; j++) {
						curr = decode(curr, rotor[rotor.length - j - 1]);
					}
				}
				rotor[rotor.length - 1]++;
				updateRotor();
				after.print(curr);
			}
			after.println();
		}
	}

	public static char encode(char curr, int rotor) {
		int find = 0;
		for (int i = 0; i < standardKey.length; i++) {
			if (curr == standardKey[i]) {
				find = i;
				break;
			}
		}
		curr = key[(rotor + find) % key.length];
		return curr;
	}

	public static char decode(char curr, int rotor) {
		int location = 0;
		for (int i = 0; i < key.length; i++) {
			if (curr == key[i]) {
				location = i;
				break;
			}
		}
		curr = standardKey[(location - rotor + standardKey.length) % standardKey.length];
		return curr;
	}

	public static void updateRotor() {
		for (int i = 0; i < rotor.length - 1; i++) {
			if(rotor[rotor.length - i - 1] >= key.length) {
				rotor[rotor.length - i - 1] %= key.length;
				rotor[rotor.length - i - 2]++;
			}
		}
		if (rotor[0] >= key.length) {
			rotor[0] %= key.length;
		}
	}

}