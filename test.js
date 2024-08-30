const bcrypt = require('bcryptjs');

(async () => {
    const password = '1234';
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log('Hashed Password:', hashedPassword);

    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Password matches:', isMatch); // Should output: true
})();
