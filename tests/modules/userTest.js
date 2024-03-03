const userService = require('./../../modules/user/service/userService');
const userUtilService = require('./../../modules/user/service/userUtilService');
const userRepository = require('./../../modules/user/repository/user');

jest.mock('./../../modules/user/service/userUtilService');
jest.mock('./../../modules/user/repository/user');
jest.mock('./../../logging/logger');
jest.mock('bcrypt');

describe('User Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    const mockName = 'Himanshu Ranjan';
    const mockEmail = 'Himanshu@example.com';
    const mockMobile = '1234567890';
    const mockPassword = 'password';
    const mockRole = 'User';
    const mockUser = { 
            "userName": "Himanshu Ranjan",
            "userEmail": "Himanshu@example.com",
            "mobile": 1234567890,
            "password": "$2b$10$VDHMvinuhEaC0vAViKH0EOqFTRu3F.Y04kaNt8CdJLEf4OPDvztIi",
            "role": "User",
            "recordStatus": true
    };

    userUtilService.validateUserInput.mockReturnValue(false);
    userRepository.getAllUsers.mockResolvedValue([]);
    userUtilService.createUserPayLoad.mockReturnValue(mockUser);
    userRepository.createUserRecord.mockResolvedValue(mockUser);

    const result = await userService.userRegister(mockName, mockEmail, mockMobile, mockPassword, mockRole);

    expect(userUtilService.validateUserInput).toHaveBeenCalledWith(mockName, mockEmail, mockMobile, mockPassword);
    expect(userRepository.getAllUsers).toHaveBeenCalledWith(null, mockEmail, null, null);
    expect(userUtilService.createUserPayLoad).toHaveBeenCalledWith(mockName, mockEmail, mockMobile, mockPassword, mockRole);
    expect(userRepository.createUserRecord).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });

  it('should throw an error if email already exists during registration', async () => {
    const mockName = 'Himanshu Ranjan';
    const mockEmail = 'Himanshu@example.com';
    const mockMobile = '1234567890';
    const mockPassword = 'password';
    const mockRole = 'User';

    userRepository.getAllUsers.mockResolvedValue([{ 
            "userName": "Himanshu Ranjan",
            "userEmail": "Himanshu@example.com",
            "mobile": 1234567890,
            "password": "$2b$10$VDHMvinuhEaC0vAViKH0EOqFTRu3F.Y04kaNt8CdJLEf4OPDvztIi",
            "role": "User",
            "recordStatus": true,
            "_id" : "65e32d17aead2dbbab5eda6e"
     }]);

    await expect(userService.userRegister(mockName, mockEmail, mockMobile, mockPassword, mockRole)).rejects.toThrowError(
      'Unable to add user. User already exists with the given Email'
    );
  });

  it('should throw an error if user input is invalid during registration', async () => {
    const mockName = 'Himanshu Ranjan';
    const mockEmail = 'Himanshuexample.com';
    const mockMobile = 'invalid'; // Invalid mobile number
    const mockPassword = 'password';
    const mockRole = 'User';

    userUtilService.validateUserInput.mockReturnValue(true);

    await expect(userService.userRegister(mockName, mockEmail, mockMobile, mockPassword, mockRole)).rejects.toThrowError(
      'Invalid input for user object creation'
    );
  });


});
